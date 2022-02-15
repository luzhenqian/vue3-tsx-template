import { defineComponent } from "vue";
import { SwipeCell, Button, Cell } from "vant";

export default defineComponent({
  setup() {
    return () => {
      return (
        <div>
          <SwipeCell
            v-slots={{
              left: <Button square type="primary" text="选择" />,
              default: <Cell border={false} title="单元格" value="内容" />,
              right: (
                <div>
                  <Button square type="danger" text="删除" />
                  <Button square type="primary" text="收藏" />
                </div>
              ),
            }}
          />
        </div>
      );
    };
  },
});
