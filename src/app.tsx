import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    console.log('in app')
    return () => (<router-view />)
  }
})
