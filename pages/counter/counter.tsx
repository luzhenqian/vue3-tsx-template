import { defineComponent, ref } from 'vue'

type Props = {
  initialValue: number;
}

export default defineComponent({
  props: {
    initialValue: {
      type: Number,
      default: 0,
    }
  },
  emits: ['decrement', 'increment'],
  setup(props: Props, { emit }) {
    const count = ref(props.initialValue)
    const decrement = () => emit('decrement', count.value --)
    const increment = () => emit('increment', count.value ++)
    return () => <div>
      <div>{ count.value }</div>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  }
})
