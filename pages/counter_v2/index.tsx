import { defineComponent } from 'vue'
import Counter from './counter'

export default defineComponent({
  setup(){
    return () => <Counter />
  }
})
