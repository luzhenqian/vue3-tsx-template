import { defineStore } from "pinia";
import { GoodscartModel } from "./model";

const goodscart = new GoodscartModel();
const {
  goodsList,
  goodscartList,
  goodsListLoading,
  total,
  quantity,
  initialGoodsList,
  plusGoods,
  minusGoods,
  addToCart,
  removeGoods,
  order,
} = goodscart;

export const useGoodscartStore = defineStore("goodscart", {
  state() {
    return {
      goodscartList,
      goodsList,
      goodsListLoading,
    };
  },
  actions: {
    initialGoodsList,
    plusGoods,
    minusGoods,
    addToCart,
    removeGoods,
    order,
  },
  getters: {
    total,
    quantity,
  },
});
