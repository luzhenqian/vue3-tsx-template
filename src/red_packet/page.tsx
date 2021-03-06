import { defineComponent, reactive, ref } from "vue";
import RedPacket, {
  RedPackets,
  Activities,
  initRedPackets,
  exchangeRedPacket,
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
    const activityId = ref("");
    const userId = "afec62bb14da81b865a54678ac1a42ae";
    const header = {
      sid: userId,
      expiration: "1647052704",
    };

    // initRedPackets(header, {
    //   userId,
    //   orderType: "train",
    //   channel: "ctrip",
    //   amount: 20,
    // }).then((result) => {
    //   data.activities = result.activities;
    //   // data.redPackets = result.redPackets;
    //   data.redPackets = [
    //     {
    //       id: '1',
    //       price: 1,
    //       title: 'ddd',
    //       expires: 'fsafasfasdfasas',
    //       description: 'dddd'
    //     }
    //   ]
    // });
    data.redPackets = [
      {
        id: "1",
        price: 1,
        title: "红包",
        expires: "fsafasfasdfasas",
        description: "dddd",
      },
    ];

    const handleRefresh = () => {
      data.redPackets.push(
        {
          id: "" + Math.random(),
          price: 1,
          title: "红包" + Math.random(),
          expires: "fsafasfasdfasas",
          description: "dddd",
        }
      )
    }

    return () => (
      <div class="page">
        <div>独立模式 可操作红包</div>
        <div>红包 id:{selectedId.value}</div>
        <div>平台活动 id: {activityId.value}</div>
        <RedPacket
          exchange={async (code: string) => {
            console.log("code:", code);
            const r = await exchangeRedPacket(header, { userId, code })
            console.log('r: ', r)
            return r.data
            // return { code: 0, message: '兑换成功'};
          }}
          onRefresh={handleRefresh}
          redPackets={data.redPackets}
          activities={data.activities}
          redPacketId={selectedId.value}
          onCheck={(id) => {
            if (selectedId.value === id) return (selectedId.value = "");
            selectedId.value = id;
          }}
          onClear={() => (selectedId.value = "")}
          // onExchange={(code) => {
          //   exchangeRedPacket(header, { code, userId });
          // }}
          onCheckActivityId={(id: string) => (activityId.value = id)}
        />

        <div>独立模式 只读红包</div>
        <RedPacket
          readonly
          redPacketId="13c4a57b28434d48a3889ddd55e2c5b3"
          redPackets={data.redPackets}
          activities={data.activities}
        />

        <div style={{ backgroundColor: "#FFFFFF" }}>
          <div>内嵌模式 可操作红包</div>
          <RedPacket
            mode="combination"
            redPackets={data.redPackets}
            activities={data.activities}
            redPacketId={selectedId.value}
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
            redPacketId="13c4a57b28434d48a3889ddd55e2c5b3"
            redPackets={data.redPackets}
            activities={data.activities}
          />
        </div>

        <div style={{ backgroundColor: "#FFFFFF" }}>
          <div>内嵌模式 只读红包 设置活动标题与红包标题</div>
          <RedPacket
            mode="combination"
            readonly
            redPacketTitle="火车票优惠红包"
            v-slots={{
              activityTitle: <div style={{ color: "#c5cad5" }}>hi</div>,
            }}
          />
        </div>
      </div>
    );
  },
});
