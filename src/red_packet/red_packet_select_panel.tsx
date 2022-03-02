import { defineComponent, PropType, ref } from "vue";
import _ from "lodash";
import { Toast } from "vant";
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
      default: "",
    },
  },
  emits: ["close", "check", "clear", "exchange"],
  setup(props, { emit }) {
    const exchangeVisible = ref(true);
    const code = ref("");
    function check(id: string) {
      emit("check", id);
    }
    function showExchange() {
      exchangeVisible.value = true;
    }
    function cancel() {
      if (exchangeVisible.value) {
        exchangeVisible.value = false;
      } else {
        emit("close");
      }
    }
    function exchange() {
      if (code.value === "") return Toast("请输入兑换码");
      emit("exchange", code.value);
    }
    return () => {
      const { redPackets, visible, selectedRedpacketId } = props;

      const selected = _.find(
        redPackets,
        ({ id }) => id === selectedRedpacketId
      );
      return (
        <div class="mask" style={{ height: visible ? "100vh" : "0px" }}>
          <div
            class="container"
            style={{
              height: visible ? "calc(87.5rem + 12.25rem)" : "0px",
              backgroundColor: exchangeVisible.value ? "#ffffff" : "#F9FAFB",
            }}
          >
            <div class="header">
              <div class="sub-text" onClick={cancel}>
                取消
              </div>
              <div class="text">{exchangeVisible.value ? "" : "选择红包"}</div>
              {exchangeVisible.value ? (
                ""
              ) : (
                <div class="sub-text" onClick={showExchange}>
                  兑换红包
                </div>
              )}
            </div>

            {exchangeVisible.value ? (
              <div class="exchange-content">
                <input
                  v-model_value={code.value}
                  class="input"
                  placeholder="请输入兑换码"
                />
                <button class="button" onClick={exchange}>
                  确定
                </button>
              </div>
            ) : redPackets.length > 0 ? (
              <div class="active-content">
                <div class="item">
                  <div class="title">不使用红包</div>
                  <i
                    onClick={() => emit("clear")}
                    class={!selected ? "icon-check" : "icon-uncheck"}
                  />
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
                    <div class="content-2">
                      <div class="title">{redPacket.title}</div>
                      <div class="desc">{redPacket.description}</div>
                      <div class="expires">{redPacket.expires}</div>
                    </div>
                    <i
                      onClick={() => check(redPacket.id)}
                      class={
                        selectedRedpacketId === redPacket.id
                          ? "icon-check"
                          : "icon-uncheck"
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div class="no-data-content">
                <div class='img'></div>
                <div class='title'>暂无红包/优惠券</div>
                <div class='sub-title'>您暂无可以使用的抵扣券/红包</div>
              </div>
            )}
          </div>
        </div>
      );
    };
  },
});
