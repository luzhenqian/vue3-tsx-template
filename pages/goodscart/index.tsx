import { defineComponent, ref } from "vue";
import _ from "lodash";
import { useGoodscartStore } from "./store";
import { GoodsList, Type, Color } from "./model";
import Goods from "./components/goods_item";
import GoodsCart from "./components/goods_cart_item";
import "./styles.css";

const { clone, sortBy, filter } = _;

const goodsListOrder = (goodsList: GoodsList, order: string) => {
  if (order === "default") return clone(goodsList);
  return sortBy(goodsList, order);
};

const goodsListFilterByType = (goodsList: GoodsList, type: string) => {
  if (type === "all") return clone(goodsList);
  return filter(goodsList, (goods) => goods.type === type);
};
const goodsListFilterByColor = (goodsList: GoodsList, color: string) => {
  if (color === "all") return clone(goodsList);
  return filter(goodsList, (goods) => goods.color === color);
};

export default defineComponent({
  setup() {
    const goodscartStore = useGoodscartStore();
    goodscartStore.initialGoodsList();
    const order = ref<string>("default");
    const type = ref<Type | "all">("all");
    const color = ref<Color | "all">("all");
    const imageVisible = ref<boolean>(false);
    return () => {
      const filtedGoodsList = goodsListFilterByColor(
        goodsListFilterByType(
          goodsListOrder(goodscartStore.goodsList, order.value),
          type.value
        ),
        color.value
      );

      return (
        <div class="page-container">

          <div class="goods-container">
            <div class="filter-item">
              <div class="filter-title">排序</div>
              <div
                class={`default ${order.value === "default" ? "active" : ""}`}
                onClick={() => (order.value = "default")}
              >
                默认
              </div>
              <div
                class={`default ${order.value === "name" ? "active" : ""}`}
                onClick={() => (order.value = "name")}
              >
                名称
              </div>
              <div
                class={`default ${order.value === "price" ? "active" : ""}`}
                onClick={() => (order.value = "price")}
              >
                价格
              </div>
            </div>

            <div class="filter-item">
              <div class="filter-title">类型</div>
              <div
                class={`default ${type.value === "all" ? "active" : ""}`}
                onClick={() => (type.value = "all")}
              >
                全部
              </div>
              <div
                class={`default ${type.value === "无缝款" ? "active" : ""}`}
                onClick={() => (type.value = "无缝款")}
              >
                无缝款
              </div>
              <div
                class={`default ${type.value === "T裆款" ? "active" : ""}`}
                onClick={() => (type.value = "T裆款")}
              >
                T裆款
              </div>
              <div
                class={`default ${type.value === "T裆开裆款" ? "active" : ""}`}
                onClick={() => (type.value = "T裆开裆款")}
              >
                T裆开裆款
              </div>
              <div
                class={`default ${type.value === "无缝开裆款" ? "active" : ""}`}
                onClick={() => (type.value = "无缝开裆款")}
              >
                无缝开裆款
              </div>
              <div
                class={`default ${type.value === "四面开裆款" ? "active" : ""}`}
                onClick={() => (type.value = "四面开裆款")}
              >
                四面开裆款
              </div>
            </div>

            <div class="filter-item">
              <div class="filter-title">颜色</div>
              <div
                class={`default ${color.value === "all" ? "active" : ""}`}
                onClick={() => (color.value = "all")}
              >
                全部
              </div>
              <div
                class={`default ${color.value === "蜜色" ? "active" : ""}`}
                onClick={() => (color.value = "蜜色")}
              >
                蜜色
              </div>
              <div
                class={`default ${color.value === "砂色" ? "active" : ""}`}
                onClick={() => (color.value = "砂色")}
              >
                砂色
              </div>
              <div
                class={`default ${color.value === "灰色" ? "active" : ""}`}
                onClick={() => (color.value = "灰色")}
              >
                灰色
              </div>
              <div
                class={`default ${color.value === "碳黑" ? "active" : ""}`}
                onClick={() => (color.value = "碳黑")}
              >
                碳黑
              </div>
            </div>

            <div class="filter-item">
              <div class="filter-title">显示图片</div>
              <div
                class={`${imageVisible.value ? 'default active' : 'default'}`}
                onClick={() => {
                  imageVisible.value = !imageVisible.value;
                }}
              >
                {imageVisible.value ? "隐藏" : "显示"}
              </div>
            </div>

            <div class="goods-container">
              {filtedGoodsList.map((goods) => (
                <Goods {...goods} v-model:imageVisible={imageVisible.value} />
              ))}
            </div>

          </div>

          <div class="goodscart-container">
            <div class="goodscart-goods-list">
              {goodscartStore.goodscartList.map((goods) => (
                <GoodsCart {...goods} v-model:imageVisible={imageVisible.value} />
              ))}
              {goodscartStore.goodscartList.length === 0 && <div>您的购物车还没有添加商品哦！</div>}
            </div>

            <div class="goodscart-order-wrapper">
              <div class="goodscart-order-item">
                <div>商品数量：</div>
                <div>{goodscartStore.total}</div>
              </div>
              <div class="goodscart-order-item">
                <div>商品总价：</div>
                <div>¥ &nbsp; {goodscartStore.quantity}</div>
              </div>
              <div class="goodscart-order-button">下单</div>
            </div>
          </div>
        </div>
      );
    };
  },
});
