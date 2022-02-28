import { defineComponent, PropType } from "vue";
import _ from "lodash";
import { RedPackets } from "./red_packet";
import "./red_packet_select_panel.scss";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    redPackets: {
      type: Array as PropType<RedPackets>,
      default: () => [],
    },
    selectedRedpacketId: {
      type: String,
      default: '',
    },
  },
  emits: ["close",'check','clear'],
  setup(props, { emit }) {
    function check(id: string) {
      emit('check', id)
    }
    return () => {
      const { redPackets, visible, selectedRedpacketId } = props;
      
      const selected = _.find(redPackets, ({id})=>id===selectedRedpacketId);
      return (
        <div class="mask" style={{ height: visible ? "100vh" : "0px" }}>
          <div class="container" style={{ height: visible ? "calc(87.5rem + 12.25rem)" : "0px" }}>
            <div class="header">
              <div class="sub-text" onClick={() => emit("close")}>
                取消
              </div>
              <div class="text">选择红包</div>
              <div class="sub-text">兑换红包</div>
            </div>
            <div class="active-content">
              <div class='item'>
                <div class="title">不使用红包</div>
                  <i onClick={()=>emit('clear')} class={!selected ? "icon-check": "icon-uncheck"} />
              </div>
              {redPackets.map((redPacket) => (
                <div class="item" key={redPacket.id}>
                  <div class="content-1">
                    <div>
                      <span class="amount-number">{redPacket.price}</span>
                      <span class="amount-unit">元</span>
                    </div>
                    <div class="type">优惠券</div>
                  </div>
                  <div class='content-2'>
                    <div class="title">{redPacket.title}</div>
                    <div class="desc">{redPacket.description}</div>
                    <div class="expires">{redPacket.expires}</div>
                  </div>
                  <i onClick={()=>check(redPacket.id)} class={selectedRedpacketId === redPacket.id ? "icon-check": "icon-uncheck"} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };
  },
});
