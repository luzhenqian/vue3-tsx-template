import { defineStore } from "pinia";
import { GoodscartModel } from "./model";

const goodscart = new GoodscartModel();
const {
  goodsList,
  goodscartList,
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
      goodscartList: goodscartList,
      goodsList: goodsList,
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
