import { defineComponent, PropType } from 'vue'
import { useGoodscartStore } from '../store'
import { Type, Color } from '../model'
import './goods_item.css'

export default defineComponent({
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String as PropType<Type>,
      default: '',
    },
    color: {
      type: String as PropType<Color>,
      default: '',
    },
    price: {
      type: Number,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      default: '',
    }
  },
  setup(props) {
    const goodscartStore = useGoodscartStore()
    return () => <div class="card">
      <div>
        {props.name}
      </div>
      <div>
        {/* <img src={props.img} /> */}
        <div>款式：{props.type}</div>
        <div>颜色：{props.color}</div>
        <div>价格：{props.price}</div>
        <div>数量：{props.amount}</div>
      </div>
      <div class="remove-button" onClick={() => goodscartStore.removeGoods(props.id)}>
        移除
      </div>
    </div>
  }
})
