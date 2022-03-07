import { defineComponent } from 'vue'
import styles from './styles.module.scss'

export default defineComponent({
  setup(){
    return () => <div class={styles.title}>css modules</div>
  }
})
