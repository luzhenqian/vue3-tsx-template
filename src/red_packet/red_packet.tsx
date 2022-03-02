import { defineComponent, PropType, ref } from "vue";
import axios from "axios";
import _ from "lodash";
import { Toast } from "vant";
import { mapping } from "./process_mapping";
import RedPacketSelectPanel from "./red_packet_select_panel";
import "./red_packet.scss";

type Mode = "independence" | "combination";

export type RedPacket = {
  id: string;
  price: number;
  title: string;
  expires: string;
  description: string;
};
export type RedPackets = RedPacket[];
type Activity = {
  deductionPrice: number;
  discount: number;
  id: string;
  mutex: boolean;
  title: string;
};
export type Activities = Activity[];

export default defineComponent({
  props: {
    mode: {
      type: String as PropType<Mode>,
      default: "independence",
    },
    containerStyle: {
      type: Object,
      default: () => ({}),
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    hasPlatformActivity: {
      type: Boolean,
      default: true,
    },
    redPackets: {
      type: Array as PropType<RedPackets>,
      default: () => [],
    },
    canUseRedPacketNumber: {
      type: Number,
      default: 0,
    },
    activities: {
      type: Array as PropType<Activities>,
      default: () => [],
    },
    redPacketId: {
      type: String,
      default: "",
    },
  },
  emits: [
    "openSelectPanel",
    "check",
    "clear",
    "closeSelectPanel",
    "exchange",
    "checkActivityId",
  ],
  methods: {},
  setup(props, { emit }) {
    const panelVisible = ref(false);
    const activityExpand = ref(false);
    const openSelectPanel = () => (panelVisible.value = true);
    const closeSelectPanel = () => (panelVisible.value = false);
    function check(id: string) {
      emit("check", id);
      closeSelectPanel();
    }
    function clear() {
      emit("clear");
      closeSelectPanel();
    }
    return () => {
      const {
        mode,
        redPackets,
        activities,
        redPacketId,
        containerStyle,
        readonly,
      } = props;
      const activity = _.maxBy(
        activities,
        (activity) => activity.deductionPrice
      );
      const selectedRedpacket = _.find(
        redPackets,
        (redPacket) => redPacket.id === redPacketId
      );
      const isMutex = () => {
        return activity && activity.mutex && redPacketId;
      };
      if (activity) {
        if (isMutex()) {
          emit("checkActivityId", "");
        } else {
          emit("checkActivityId", activity.id);
        }
      }
      return (
        <div
          class={`container ${mode}`}
          style={{
            ...{ pointerEvents: readonly ? "none" : "auto" },
            ...containerStyle,
          }}
        >
          <div class="activity">
            <div class="title-wrapper">
              <i class="icon-activity" />
              <span class="title">平台活动</span>
            </div>
            <div class="amount-wrapper">
              {activities.length === 0 && (
                <span class="sub-title">暂无平台活动</span>
              )}
              {isMutex() ? (
                <span class="mutex-text">与红包互斥</span>
              ) : (
                activities.length > 0 &&
                activity && (
                  <>
                    <span class="discounted-amount">
                      -¥{activity.deductionPrice}
                    </span>
                    {readonly ? (
                      ""
                    ) : (
                      <i
                        onClick={() => {
                          activityExpand.value = !activityExpand.value;
                        }}
                        class="icon-arrow-down"
                        style={{
                          transform: activityExpand.value
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      />
                    )}
                  </>
                )
              )}
            </div>
          </div>

          {activityExpand.value &&
            activities.map((activity) => {
              return (
                <div class="sub-activity">
                  <div class="title-wrapper">
                    <i class="icon-activity" />
                    <span class="title">{activity.title}</span>
                  </div>
                  <div class="amount-wrapper">
                    <span class="discounted-amount">
                      -¥{activity.deductionPrice}
                    </span>
                  </div>
                </div>
              );
            })}

          <div class="redpacket">
            <div class="title-wrapper">
              <i class="icon-redpacket" />
              <span class="title">红包抵扣/兑换红包</span>
            </div>
            <div class="amount-wrapper" onClick={openSelectPanel}>
              {redPackets.length === 0 && (
                <span class="sub-title">暂无可用红包</span>
              )}
              {selectedRedpacket ? (
                <div class="discounted-amount">-¥{selectedRedpacket.price}</div>
              ) : (
                redPackets.length > 0 && (
                  <div class="can-use">{redPackets.length}个可用红包</div>
                )
              )}
              {readonly ? "" : <i class="icon-arrow-right" />}
            </div>
          </div>

          <RedPacketSelectPanel
            onCheck={check}
            onClose={closeSelectPanel}
            onExchange={(code) => emit("exchange", code)}
            visible={panelVisible.value}
            redPackets={redPackets}
            selectedRedpacketId={redPacketId}
            onClear={clear}
          />
        </div>
      );
    };
  },
});

type Header =
  | {
      sid?: string;
      expiration?: string;
      appcode?: string;
    }
  | Record<string, string>;

type InitRedPacketsData =
  | {
      userId?: string;
      orderType?: string;
      channel?: string;
      amount?: number;
    }
  | Record<string, any>;

/**
 * 查询可用的红包和平台活动
 * @param headers 自定义请求头，比如用户身份认证
 * @param data 自定义请求体
 * @param request http 请求器，默认为 axios
 * @param url 接口 url
 * @returns
 */
export async function initRedPackets(
  headers: Header,
  data: InitRedPacketsData | Record<string, any>,
  request: any = axios,
  url: string = "https://dev-me.otosaas.com/api/promotion/v2/query_promotions"
) {
  const response = await request(url, {
    method: "POST",
    headers,
    data,
  });
  return mapping(response.data.data);
}

type ExchangeRedPacketData =
  | {
      userId?: string;
      code?: string;
    }
  | Record<string, any>;

/**
 * 兑换红包
 * @param headers 自定义请求头，比如用户身份认证
 * @param data 自定义请求体
 * @param request http 请求器，默认为 axios
 * @param url 接口 url
 */
export async function exchangeRedPacket(
  headers: Header,
  data: ExchangeRedPacketData,
  request: any = axios,
  url: string = "https://dev-me.otosaas.com/api/promotion/redeem_code"
) {
  const response = await request(`${url}/${data.userId}/${data.code}`, {
    method: "GET",
    headers,
  });
  Toast(response.data.message);
  return response;
}

type SettleRedPacketData =
  | {
      orderId?: string;
      orderType?: string;
      couponId?: string;
      activityId?: string;
    }
  | Record<string, any>;

/**
 * 计算优惠
 * @param headers
 * @param data
 * @param callback
 * @param request
 * @param url
 */
export async function settle(
  headers: Header,
  data: SettleRedPacketData,
  request: any = axios,
  url: string = "https://dev-me.otosaas.com/api/settle/v1"
) {
  const response = await request(url, {
    method: "GET",
    headers,
    params: data,
  });
  return response;
}
