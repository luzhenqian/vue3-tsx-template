import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  setup(){
    console.log('root setup')
    const visible = ref(true)
    onMounted(()=>{
      console.log('root mounted')
    })
    return () => <div>root
      {visible.value && <><Component1 /><Component2 /></>}
      <button onClick={() => visible.value = false}>remove</button>
    </div>
  }
})

const Component1 = defineComponent({
  setup(){
    console.log('component1 setup')
    onMounted(()=>{
      console.log('component1 mounted')
    })
    onUnmounted(()=>{
      console.log('component1 un mounted')
    })
    return () => <div>1
    <Component3 />
    </div>
  }
})

const Component2 = defineComponent({
  setup(){
    console.log('component2 setup')
    onMounted(()=>{
      console.log('component2 mounted')
    })
    onUnmounted(()=>{
      console.log('component2 un mounted')
    })
    return () => <div>2</div>
  }
})

const Component3 = defineComponent({
  setup(){
    console.log('component3 setup')
    onMounted(()=>{
      console.log('component3 mounted')
    })
    onUnmounted(()=>{
      console.log('component3 un mounted')
    })
    return () => <div>3</div>
  }
})
