import { defineComponent } from 'vue'

export default defineComponent({
  setup(){
    return () => <div>Node Env: { process.env.NODE_ENV }</div>
  }
})
