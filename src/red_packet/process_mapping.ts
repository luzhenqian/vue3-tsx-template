import dayjs from "dayjs";
import _ from "lodash";
import { RedPacket, RedPackets } from "./red_packet";

export function mapping(raw: any) {
  return {
    redPackets: redPacketsMapping(raw.coupons),
    canUseRedPacketNumber: raw.couponNum,
    activities: raw.activities || [],
  };
}

function redPacketsMapping(raw: any[]): RedPackets {
  return _.map(raw, redPacketMapping);
}

export function redPacketMapping(raw: any): RedPacket {
  return {
    id: raw.id,
    price: raw.deductionPrice,
    title: raw.title,
    expires: dayjs(raw.ets * 1000).format("YYYY-MM-DD") + " 到期",
    description: "",
  };
}
