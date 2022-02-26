import { defineComponent ,reactive,ref  } from 'vue'
import axios from 'axios'
import RedPacket, {RedPackets, Activities, initRedPackets } from './red_packet'
import './styles.scss'

export default defineComponent({
  setup() {
    const data = reactive<{
      activities: Activities
      redPackets: RedPackets
    }>({
      activities: [],
      redPackets: []
    })
    const selectedId = ref('')

    initRedPackets(
      {
        'sid': '3ca68c504fa56217818d72ffe63927e5',
        'expiration': '1645960890',
      },
      {
        "userId": "3ca68c504fa56217818d72ffe63927e5",
        "orderType": "train",
        "channel": "ctrip",
        "amount": 888
    }).then((result) => {
      data.activities = result.activities
      data.redPackets = result.redPackets
    })

    return () => <div class='page'>
      <RedPacket 
      redPackets={data.redPackets} 
      activities={data.activities} 
      selectedRedpacketId={selectedId.value}
      onCheck={(id)=>{
        if(selectedId.value === id) return selectedId.value = ''
          selectedId.value=id
      }}
      onClear={()=>selectedId.value = ''}/>
    </div>
  }
})