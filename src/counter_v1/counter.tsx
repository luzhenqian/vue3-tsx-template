import { defineComponent, ref } from 'vue'
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
  emits: ['decrement', 'increment'],
  setup(props: Props, { emit }) {
    const count = ref(props.value)
    const decrement = () => emit('decrement', count.value --)
    const increment = () => emit('increment', count.value ++)
    return () => <div>
      <div>{ count.value }</div>
      <Button type="primary" onClick={decrement}>-</Button>
      <Button type="primary" onClick={increment}>+</Button>
    </div>
  }
})
