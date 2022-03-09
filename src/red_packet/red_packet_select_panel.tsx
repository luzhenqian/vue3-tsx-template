import { defineComponent, PropType, ref } from "vue";
import _ from "lodash";
import { Toast } from "vant";
import { RedPackets } from "./red_packet";
import styles from "./red_packet_select_panel.module.scss";

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
    const exchangeVisible = ref(false);
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
        <div class={styles['mask']} style={{ height: visible ? "100vh" : "0px" }}>
          <div
            class={styles['container']}
            style={{
              height: visible ? "calc(87.5rem + 12.25rem)" : "0px",
              backgroundColor: exchangeVisible.value ? "#ffffff" : "#F9FAFB",
            }}
          >
            <div class={styles['header']}>
              <div class={styles['sub-text']} onClick={cancel}>
                取消
              </div>
              <div class={styles['text']}>{exchangeVisible.value ? "" : "选择红包"}</div>
              {exchangeVisible.value ? (
                ""
              ) : (
                <div class={styles['sub-text']} onClick={showExchange}>
                  兑换红包
                </div>
              )}
            </div>

            {exchangeVisible.value ? (
              <div class={styles['exchange-content']}>
                <input
                  v-model_value={code.value}
                  class={styles['input']}
                  placeholder="请输入兑换码"
                />
                <button class={styles['button']} onClick={exchange}>
                  确定
                </button>
              </div>
            ) : redPackets.length > 0 ? (
              <div class={styles['active-content']}>
                <div class={styles['item']}>
                  <div class={styles['title']}>不使用红包</div>
                  <i
                    onClick={() => emit("clear")}
                    class={!selected ? "icon-check" : "icon-uncheck"}
                  />
                </div>
                {redPackets.map((redPacket) => (
                  <div class={styles['item']} key={redPacket.id} onClick={() => check(redPacket.id)}>
                    <div class={styles['content-1']}>
                      <div>
                        <span class={styles['amount-number']}>{redPacket.price}</span>
                        <span class={styles['amount-unit']}>元</span>
                      </div>
                      <div class={styles['type']}>优惠券</div>
                    </div>
                    <div class={styles['content-2']}>
                      <div class={styles['title']}>{redPacket.title}</div>
                      <div class={styles['desc']}>{redPacket.description}</div>
                      <div class={styles['expires']}>{redPacket.expires}</div>
                    </div>
                    <i
                      class={
                        selectedRedpacketId === redPacket.id
                          ? styles["icon-check"]
                          : styles["icon-uncheck"]
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div class={styles['no-data-content']}>
                <div class={styles['img']}></div>
                <div class={styles['title']}>暂无红包/优惠券</div>
                <div class={styles['sub-title']}>您暂无可以使用的抵扣券/红包</div>
              </div>
            )}
          </div>
        </div>
      );
    };
  },
});
