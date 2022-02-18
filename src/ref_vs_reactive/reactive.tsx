import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    return () => <div>
      <ReactiveComponent />
      <ReactiveComponent2 />
    </div>;
  },
});

const ReactiveComponent = defineComponent({
  setup() {
    const data = reactive({count: 0});
    return () => (
      <div>
        <span>count:{data.count}</span>
        <button onClick={()=>data.count++}>+</button>
      </div>
    );
  },
});

const ReactiveComponent2 = defineComponent({
  setup() {
    let data = reactive({count: 0});
    return () => (
      <div>
        <span>count:{data.count}</span>
        <button onClick={()=>data = { count: data.count++}}>+</button>
      </div>
    );
  },
});
