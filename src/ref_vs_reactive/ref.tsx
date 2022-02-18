import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  setup() {
    return () => <div>
      <RefComponent />
      <RefObjectComponent />
    </div>;
  },
});

const RefComponent = defineComponent({
  setup() {
    const value = ref("");
    return () => (
      <div>
        <span>value:</span>
        {value.value}
        <input v-model={value.value} />
      </div>
    );
  },
});

const RefObjectComponent = defineComponent({
  setup() {
    const value = ref({ name: "", age: 18 });
    return () => (
      <div>
        <div>{value.value.name}</div>
        <div>{value.value.age}</div>
        <input v-model={value.value.name} />
        <input v-model={value.value.age} />
      </div>
    );
  },
});
