import { createApp, ref, reactive, onMounted, defineComponent, nextTick } from 'vue'

const App = defineComponent({
  setup () {
    const mRef = ref()
    const v = 3
    const c = reactive([1, 444, 3])
    onMounted(() => {
      setTimeout(() => {
        c.push(44444)
        // console.log('4')
        nextTick(() => {
          mRef.value.masonryLayouts()
        })
      }, 2000)
    })
    return () => (
      <div>
        {c.map(m => <div key={m}>{m}</div>)}
      </div>
    )
  }
})

createApp(App).mount('#app')
