import { defineComponent, reactive, ref } from "vue";
import RedPacket, {
  RedPackets,
  Activities,
  initRedPackets,
} from "./red_packet";
import "./styles.scss";

export default defineComponent({
  setup() {
    const data = reactive<{
      activities: Activities;
      redPackets: RedPackets;
    }>({
      activities: [],
      redPackets: [],
    });
    const selectedId = ref("");

    initRedPackets(
      {
        sid: "dc1244afbf0aea614782944612d1fe4f",
        expiration: "1646273057",
      },
      {
        userId: "dc1244afbf0aea614782944612d1fe4f",
        orderType: "train",
        channel: "ctrip",
        amount: 888,
      }
    ).then((result) => {
      data.activities = result.activities;
      data.redPackets = result.redPackets;
    });

    return () => (
      <div class="page">
        <div>独立模式 可操作红包</div>
        <RedPacket
          redPackets={data.redPackets}
          activities={data.activities}
          selectedRedpacketId={selectedId.value}
          onCheck={(id) => {
            if (selectedId.value === id) return (selectedId.value = "");
            selectedId.value = id;
          }}
          onClear={() => (selectedId.value = "")}
        />

        <div>独立模式 只读红包</div>
        <RedPacket
          readonly
          selectedRedpacketId="13c4a57b28434d48a3889ddd55e2c5b3"
          redPackets={data.redPackets}
          activities={data.activities}
          onCheck={(id) => {
            if (selectedId.value === id) return (selectedId.value = "");
            selectedId.value = id;
          }}
          onClear={() => (selectedId.value = "")}
        />

        <div style={{ backgroundColor: "#FFFFFF" }}>
          <div>内嵌模式 可操作红包</div>
          <RedPacket
            mode="combination"
            redPackets={data.redPackets}
            activities={data.activities}
            selectedRedpacketId={selectedId.value}
            onCheck={(id) => {
              if (selectedId.value === id) return (selectedId.value = "");
              selectedId.value = id;
            }}
            onClear={() => (selectedId.value = "")}
          />
        </div>

        <div style={{ backgroundColor: "#FFFFFF" }}>
          <div>内嵌模式 只读红包</div>
          <RedPacket
            mode="combination"
            readonly
            selectedRedpacketId="13c4a57b28434d48a3889ddd55e2c5b3"
            redPackets={data.redPackets}
            activities={data.activities}
            onCheck={(id) => {
              if (selectedId.value === id) return (selectedId.value = "");
              selectedId.value = id;
            }}
            onClear={() => (selectedId.value = "")}
          />
        </div>
      </div>
    );
  },
});
