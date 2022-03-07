import { defineComponent ,ref  } from 'vue'
import Counter from './counter'

export default defineComponent({
  setup(){
    const count = ref(10)
    throw Error('find a error!')
    return () => <Counter v-model_initialValue={count.value}/>
  }
})
