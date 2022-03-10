import { defineComponent, PropType, ref } from "vue";
import axios from "axios";
import _ from "lodash";
import { Toast } from "vant";
import { mapping } from "./process_mapping";
import RedPacketSelectPanel from "./red_packet_select_panel";
import styles from "./red_packet.module.scss";
import classNames from "classnames";

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
    // 仅 readonly 为 true 时可用
    activityTitle: {
      type: String,
    },
    // 仅 readonly 为 true 时可用
    redPacketTitle: {
      type: String,
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
  setup(props, { emit, slots }) {
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
        activityTitle,
        redPacketTitle,
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
          class={classNames(styles.container, styles[mode])}
          style={{
            ...{ pointerEvents: readonly ? "none" : "auto" },
            ...containerStyle,
          }}
        >
          <div class={styles.activity}>
            <div class={styles["title-wrapper"]}>
              <i class={styles["icon-activity"]} />
              <span class={styles.title}>平台活动</span>
            </div>
            <div class={styles["amount-wrapper"]}>
              {readonly ? (
                <span class={styles["discounted-amount"]}>
                  {activityTitle ||
                    (slots.activityTitle && slots.activityTitle())}
                </span>
              ) : (
                activities.length === 0 && (
                  <span class={styles["sub-title"]}>暂无平台活动</span>
                )
              )}
              {isMutex() ? (
                <span class={styles["mutex-text"]}>与红包互斥</span>
              ) : (
                activities.length > 0 &&
                activity && (
                  <>
                    <span class={styles["discounted-amount"]}>
                      -¥{activity.deductionPrice}
                    </span>
                    {readonly ? (
                      ""
                    ) : (
                      <i
                        onClick={() => {
                          activityExpand.value = !activityExpand.value;
                        }}
                        class={styles["icon-arrow-down"]}
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
                <div class={styles["sub-activity"]}>
                  <div class={styles["title-wrapper"]}>
                    <i class={styles["icon-activity"]} />
                    <span class={styles["title"]}>{activity.title}</span>
                  </div>
                  <div class={styles["amount-wrapper"]}>
                    <span class={styles["discounted-amount"]}>
                      -¥{activity.deductionPrice}
                    </span>
                  </div>
                </div>
              );
            })}

          <div class={styles["redpacket"]} onClick={openSelectPanel}>
            <div class={styles["title-wrapper"]}>
              <i class={styles["icon-redpacket"]} />
              <span class={styles["title"]}>红包抵扣/兑换红包</span>
            </div>
            <div class={styles["amount-wrapper"]}>
              {readonly ? (
                <span class={styles["discounted-amount"]}>
                  {redPacketTitle ||
                    (slots.redPacketTitle && slots.redPacketTitle())}
                </span>
              ) : (
                <>
                  {" "}
                  {redPackets.length === 0 && (
                    <span class={styles["sub-title"]}>暂无可用红包</span>
                  )}
                  {selectedRedpacket ? (
                    <div class={styles["discounted-amount"]}>
                      -¥{selectedRedpacket.price}
                    </div>
                  ) : (
                    redPackets.length > 0 && (
                      <div class={styles["can-use"]}>
                        {redPackets.length}个可用红包
                      </div>
                    )
                  )}
                  {readonly ? "" : <i class={styles["icon-arrow-right"]} />}
                </>
              )}
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
