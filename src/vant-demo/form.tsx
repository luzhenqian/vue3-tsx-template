import { defineComponent, ref } from "vue";
import { Form, Field, RadioGroup, Radio } from "vant";

export default defineComponent({
  setup() {
    const checked = ref('1')
    return () => {
      return (
        <div>
          <Form>
            <RadioGroup v-model={checked.value}>
              <Radio name="1">单选框 1</Radio>
              <Radio name="2">单选框 2</Radio>
            </RadioGroup>
          </Form>
        </div>
      );
    };
  },
});
