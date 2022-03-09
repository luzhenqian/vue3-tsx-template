import { defineComponent } from 'vue'
import './styles.scss'

export default defineComponent({
  setup(){
    return () => <div>
        <a class='remove-tap-highlight' href='#'>请点击测试阴影效果</a>
      </div>
  }
})
