import { defineComponent } from 'vue'
import './styles.scss'

export default defineComponent({
  setup(){
    return () => <div>
        <a href='#'>请点击测试阴影效果</a>
      </div>
  }
})
