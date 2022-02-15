import { defineComponent ,ref  } from 'vue'
import CitySelect from './city_select'

export default defineComponent({
  setup(){
    const data = [
      { name: '济南', code: 'jinan'},
      { name: '上海', code: 'shanghai'},
      { name: '三亚', code: 'sanya'},
      { name: '日照', code: 'rizhao'},
      { name: '海口', code: 'haikou'},
      { name: '丽江', code: 'lijiang'},
      { name: '北京', code: 'beijing'},
      { name: '临沂', code: 'linyi'},
      { name: '徐州', code: 'xuzhou'},
      { name: '徐州1', code: 'xuzhou1'},
      { name: '徐州2', code: 'xuzhou2'},
      { name: '徐州3', code: 'xuzhou3'},
      { name: '徐州4', code: 'xuzhou4'},
      { name: '徐州5', code: 'xuzhou5'},
      { name: '徐州6', code: 'xuzhou6'},
      { name: '徐州7', code: 'xuzhou7'},
      { name: '徐州8', code: 'xuzhou8'},
    ]
    return () => <CitySelect data={data}/>
  }
})