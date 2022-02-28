import { defineComponent, PropType, ref } from "vue";
import RedPacketSelectPanel from "./red_packet_select_panel";
import _ from "lodash";
import dayjs from "dayjs";
import "./red_packet.scss";
import axios from "axios";

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

export function rawToData(raw: any) {
  return {
    redPackets: rawToRedPackets(raw.coupons),
    canUseRedPacketNumber: raw.couponNum,
    activities: raw.activities || [],
  };
}

function rawToRedPackets(raw: any[]): RedPackets {
  return _.map(raw, rawToRedPacket);
}

export function rawToRedPacket(raw: any): RedPacket {
  return {
    id: raw.id,
    price: raw.deductionPrice,
    title: raw.title,
    expires: dayjs(raw.ets * 1000).format("YYYY-MM-DD") + " 到期",
    description: "",
  };
}

export default defineComponent({
  props: {
    mode: {
      type: String as PropType<Mode>,
      default: "independence",
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
    mutex: {
      type: Boolean,
      default: false,
    },
    selectedRedpacketId: {
      type: String,
      default: "",
    },
  },
  emits: ["openSelectPanel", "check", "clear", "closeSelectPanel"],
  methods: {},
  setup(props, { emit }) {
    const panelVisible = ref(false);
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
      const { mode, redPackets, activities, selectedRedpacketId } = props;
      const activity = activities[0];
      const selectedRedpacket = _.find(
        redPackets,
        (redPacket) => redPacket.id === selectedRedpacketId
      );
      return (
        <div class={`container ${mode}`}>
          <div class="activity">
            <div class="title-wrapper">
              <i class="icon-activity" />
              <span class="title">平台活动</span>
            </div>
            <div class="amount-wrapper">
              {activities.length === 0 && (
                <span class="title">暂无平台活动</span>
              )}
              {activities.length > 0 && (
                <>
                  <span class="discounted-amount">
                    -¥{activity.deductionPrice}
                  </span>
                  <i class="icon-arrow-down" />
                </>
              )}
            </div>
          </div>

          <div class="redpacket">
            <div class="title-wrapper">
              <i class="icon-redpacket" />
              <span class="title">红包抵扣/兑换红包</span>
            </div>
            <div
              class="amount-wrapper"
              onClick={() => (redPackets.length > 0 ? openSelectPanel() : null)}
            >
              {redPackets.length === 0 && (
                <span class="title">暂无可用红包</span>
              )}
              {selectedRedpacket ? (
                <div class="discounted-amount">-¥{selectedRedpacket.price}</div>
              ) : (
                redPackets.length > 0 && (
                  <div class="can-use">{redPackets.length}个可用红包</div>
                )
              )}
              <div class="icon-arrow-right"></div>
            </div>
          </div>

          <RedPacketSelectPanel
            onCheck={check}
            onClose={closeSelectPanel}
            visible={panelVisible.value}
            redPackets={redPackets}
            selectedRedpacketId={selectedRedpacketId}
            onClear={clear}
          />
        </div>
      );
    };
  },
});

export async function initRedPackets(
  headers: Record<string, string>,
  data: any,
  request: any = axios,
  url: string = "https://dev-me.otosaas.com/api/promotion/v2/query_promotions",
) {
  const response = await request(url, {
    method: "POST",
    headers,
    data,
  });
  return rawToData(response.data.data);
}

export async function checkPromotions(
  headers: Record<string, string>,
  data: any,
  callback: (value: any) => void,
  request: any = axios,
  url: string = "https://dev-me.otosaas.com/api/promotion/v2/check_promotions",
) {
  const response = await request(url, {
    method: "POST",
    headers,
    data,
  });
  callback(response.data.data);
}
