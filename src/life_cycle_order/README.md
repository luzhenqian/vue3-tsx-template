# 组件生命周期执行顺序

## 组件嵌套结构

root
  component1
    component3
  component2

## setup 执行顺序

root -> component1 -> component3 -> component2

总结：自上而下，深层执行。

## mounted 执行顺序

component3 -> component1 -> component2 -> root

总结：自上而下，深层执行。

## unmounted 执行顺序

component3 -> component1 -> component2 -> root

总结：自上而下，深层执行。与 mounted 执行顺序一致。
