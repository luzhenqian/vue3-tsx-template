import { defineComponent, ref } from "vue";
import { Tabbar, TabbarItem } from "vant";

export default defineComponent({
  setup() {
    const active = ref(1)
    return () => {
      return (
        <div>
          <Tabbar v-model={active.value}>
            <TabbarItem>tab1</TabbarItem>
            <TabbarItem>tab2</TabbarItem>
            <TabbarItem>tab3</TabbarItem>
          </Tabbar>
        </div>
      );
    };
  },
});
