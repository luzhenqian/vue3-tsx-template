import { defineStore } from 'pinia';
import {GoodscartModel} from './model'

const goodscart = new GoodscartModel();
const {query,goodsList, goodscartList, total, quantity, initialGoodsList, addToCart, removeGoods, order} = goodscart

export const useGoodscartStore = defineStore('goodscart', {
  state () {
    return {
      query:query,
      goodscartList :goodscartList,
      goodsList:goodsList,
    }
  },
  actions: {
    initialGoodsList,
    addToCart,
    removeGoods,
    order,
  },
  getters: {
    total,
    quantity
  }
})
