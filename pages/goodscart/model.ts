import { pull } from 'lodash'
import data from './data'
export type Filter = 'default'|'name'|'price'
export type Type = '无缝款'|'T裆款'|'T裆开裆款'|'无缝开裆款'|'四面开裆款'
export type Color = '蜜色'|'砂色'|'黑色'|'灰色'|'碳黑'

export type Goods = {
  id: string,
  name: string,
  type: Type,
  color: Color,
  price: number,
  img: string,
}
export type Goodscart = ({ amount: number } & Goods)
export type GoodsList = Goods[]
export type GoodscartList = Goodscart []

function goodsToGoodscart (goods: Goods):Goodscart{
  return {
    id: goods.id,
    name: goods.name,
    type: goods.type,
    color: goods.color,
    price: goods.price,
    img: goods.img,
    amount: 0
  }
}

export interface IGoodscartModel {
  query: {
    filter: Filter,
    order: string,
  },
  goodsList: GoodsList,
  goodscartList: GoodscartList,
  total: () => number,
  quantity: () => number,

  initialGoodsList: () => void,
  addToCart: (goodsId: string) => void,
  removeGoods: (goodsId: string) => void,
  order: () => void,
}

export class GoodscartModel implements IGoodscartModel {
  query = { filter: 'default' as Filter, order: '' }
  goodsList: GoodsList = [];
  goodscartList: GoodscartList = []
  quantity () {
    return this.goodscartList.reduce((acc, item) => { return acc + item.price * item.amount }, 0)
  }
  total() {
    return this.goodscartList.reduce((acc, item) => acc + item.amount, 0)
  }
  initialGoodsList () {
    this.goodsList = data as GoodsList
  }
  addToCart (goodsId: string) {
    const targetGoods = this.goodsList.find(goods => goods.id === goodsId);
    if(targetGoods) {
      const goods = this.goodscartList.find(goods=> goods.id === targetGoods.id);
      if(goods) {
        goods.amount ++
        return
      }
      const appendGoods = goodsToGoodscart(targetGoods)
      appendGoods.amount = 1
      this.goodscartList.push(appendGoods);
    }
  }
  removeGoods (goodsId: string) {
    const targetGoods = this.goodscartList.find(goods => goods.id === goodsId);
    if(targetGoods) {
      pull(this.goodscartList, targetGoods);
    }
  }
  order () {
    alert('下单成功！')
  }
}
