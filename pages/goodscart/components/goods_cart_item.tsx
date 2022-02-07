import { defineComponent, PropType } from "vue";
import { useGoodscartStore } from "../store";
import { Type, Color } from "../model";
import "./goods_item.css";

export default defineComponent({
  props: {
    id: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    type: {
      type: String as PropType<Type>,
      default: "",
    },
    color: {
      type: String as PropType<Color>,
      default: "",
    },
    price: {
      type: Number,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      default: "",
    },
    imageVisible: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const goodscartStore = useGoodscartStore();
    return () => (
      <div class="card">
        <div class="goods-name">{props.name}</div>
        <div>
          {props.imageVisible && <img src={props.img} />}
          <div>款式：{props.type}</div>
          <div>颜色：{props.color}</div>
          <div>价格：¥{props.price}</div>
          <div>数量：{props.amount}</div>
        </div>
        <div class="icon-wrapper">
          <fa-icon
            onClick={() => goodscartStore.plusGoods(props.id)}
            title="添加"
            class="icon plus"
            icon="plus"
          />
          <fa-icon
            onClick={() => goodscartStore.minusGoods(props.id)}
            title="减少"
            class="icon minus"
            icon="minus"
          />
          <fa-icon
            onClick={() => goodscartStore.removeGoods(props.id)}
            title="移除"
            class="icon trash"
            icon="trash"
          />
        </div>
      </div>
    );
  },
});
