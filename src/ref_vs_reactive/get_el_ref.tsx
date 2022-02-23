import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const el = ref()
    onMounted(()=> {
      console.log('el: ', el)
    })
    return () => <div ref={el}>i'm el!</div>;
  },
});
