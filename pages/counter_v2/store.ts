import { defineStore, StateTree, StoreDefinition, DefineStoreOptions } from 'pinia'
import { Counter } from './model'

const counter: Counter = {
  count: 0,
  increment(){
    this.count ++
  },
  decrement(){
    this.count --
  },
}

// export declare function generateStore<Id extends string, Model extends StateTree = {}>(id: Id, model: Omit<DefineStoreOptions<Id, Model, any, any>, 'id'>): StoreDefinition<Id, Model, any, any>;
// TODO: ts 类型不提示
// function generateStore(id: string, model: Counter) {
//   return defineStore(id, 
//   {
//     state: () => {
//       return { count: counter.count }
//     },
//     actions: {
//       increment: counter.increment,
//       decrement: counter.decrement
//     }
//   })
  
// }

// generateStore('counter', counter)

export const useCounterStore = defineStore('counter', 
  {
    state: () => {
      return { count: counter.count }
    },
    actions: {
      increment: counter.increment,
      decrement: counter.decrement
    }
  }
)
