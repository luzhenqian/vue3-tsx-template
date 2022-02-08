import { pull, find } from "lodash";
import { create, all } from 'mathjs';
import data from "./data";
export type Filter = "default" | "name" | "price";
export type Type =
  | "无缝款"
  | "T裆款"
  | "T裆开裆款"
  | "无缝开裆款"
  | "四面开裆款";
export type Color = "蜜色" | "砂色" | "黑色" | "灰色" | "碳黑";

export type Goods = {
  id: string;
  name: string;
  type: Type;
  color: Color;
  price: number;
  img: string;
};
export type Goodscart = { amount: number } & Goods;
export type GoodsList = Goods[];
export type GoodscartList = Goodscart[];

function goodsToGoodscart(goods: Goods): Goodscart {
  return {
    id: goods.id,
    name: goods.name,
    type: goods.type,
    color: goods.color,
    price: goods.price,
    img: goods.img,
    amount: 0,
  };
}

export interface IGoodscartModel {
  filter: Filter;
  order: string;
  imageVisible: boolean;
  goodsListLoading: boolean;
  goodscartLoading: boolean;
  goodsList: GoodsList;
  goodscartList: GoodscartList;
  total: () => number;
  quantity: () => number;

  initialGoodsList: () => Promise<void>;
  initialGoodscart:() => Promise<void>;
  addToCart: (goodsId: string) => void;
  plusGoods: (goodsId: string) => void;
  minusGoods: (goodsId: string) => void;
  removeGoods: (goodsId: string) => void;
  submitOrder: () => Promise<void>;
}

const mathjs = create(all);
mathjs.config({ number: 'BigNumber' });

export class GoodscartModel implements IGoodscartModel {
  filter: Filter ="default"; 
  order: string = "";
  imageVisible: boolean = false;
  goodsList: GoodsList = [];
  goodscartList: GoodscartList = [];
  goodsListLoading: boolean = false;
  goodscartLoading: boolean = false;
  quantity() {
    return this.goodscartList.reduce((acc, item) => {
      return mathjs.chain(acc).add(item.price).multiply(item.amount).round(2).done();
    }, 0);
  }
  total() {
    return this.goodscartList.reduce((acc, item) => acc + item.amount, 0);
  }
  async initialGoodsList() {
    this.goodsListLoading = true;
    new Promise<GoodsList>((resolve, reject) => {
      setTimeout(() => {
        resolve(data as GoodsList)
      }, 2000)
    }).then((resData: GoodsList)=>{
      this.goodsList = resData;
      this.goodsListLoading = false;
    })
  }
  async initialGoodscart() {
    this.goodscartList = [];
  }
  addToCart(goodsId: string) {
    const targetGoods = find(this.goodsList, (goods) => goods.id === goodsId);
    if (targetGoods) {
      const goods = this.goodscartList.find(
        (goods) => goods.id === targetGoods.id
      );
      if (goods) {
        this.plusGoods(goodsId)
        return;
      }
      const appendGoods = goodsToGoodscart(targetGoods);
      appendGoods.amount = 1;
      this.goodscartList.push(appendGoods);
    }
  }
  plusGoods(goodsId: string) {
    const targetGoods = find(this.goodscartList, ({ id }) => id === goodsId);
    if (targetGoods) {
      targetGoods.amount++;
    }
  }
  minusGoods(goodsId: string) {
    const targetGoods = find(this.goodscartList, ({ id }) => id === goodsId);
    if (targetGoods) {
      if (targetGoods.amount === 1) {
        this.removeGoods(goodsId);
        return;
      }
      targetGoods.amount--;
    }
  }
  removeGoods(goodsId: string) {
    const targetGoods = find(this.goodscartList, ({ id }) => id === goodsId);
    if (targetGoods) {
      pull(this.goodscartList, targetGoods);
    }
  }
  async submitOrder() {
    alert("下单成功！");
  }
}
