import { defineComponent, ref } from 'vue'
import { useCounterStore } from './store'
import { Button } from 'vant'

type Props = {
  value: number;
}

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 0,
    }
  },
  setup(props: Props) {
    const counterStore = useCounterStore()

    return () => <div>
      <div>{ counterStore.count }1</div>
      <Button type="primary" onClick={counterStore.decrement}>-</Button>
      <Button type="primary" onClick={counterStore.increment}>+</Button>
    </div>
  }
})
