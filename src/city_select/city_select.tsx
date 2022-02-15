import { defineComponent, PropType, ref, reactive, watch } from "vue";
import cnchar from "cnchar";
import _ from "lodash";
import "./styles.css";

const { throttle } = _

type Data = {
  name: string;
  code: string;
};

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<Data[]>,
      default: [],
    },
    locationCity: {
      type: String,
      default: "",
    },
    currentSelectedCity: {
      type: String,
      default: "",
    },
  },
  emits: ["selectedCity", "clickLocationCity", "clickCurrentSelectedCity"],
  setup(props, { emit }) {
    const letterArr = [...Array(26).keys()].map((i) =>
      String.fromCharCode(i + 65)
    );

    const filterKeywords = ref("");
    const activeCode = ref("")

    watch(activeCode, (value) => {
      console.log(value, 'value')
      if(value){
        const idxEl = document.getElementById(`idx-${value}`)
        const contentWrapper = document.querySelector('div.content-wrapper')
        if(idxEl && contentWrapper) {
          // const rect = idxEl.getBoundingClientRect();
          contentWrapper.scroll(0, idxEl.offsetTop - 68)
          // console.log(contentWrapper, rect)
        }
      }
    })

    const dataSorted = _.sortBy(props.data, (item) => {
      return cnchar.spell(item.name)[0];
    });

    const indexBarClick = throttle((event: TouchEvent) => {
      console.log("event: ", event.target);
      if(event.target && event.target.dataset){
        activeCode.value = event.target.dataset.code
        setTimeout(() => {
          activeCode.value = ''
        }, 1000);
      }
      event.preventDefault();
    }, 100);

    const selectedCity = (city: Data) => {
      emit("selectedCity", city);
    };

    return () => {
      let dataRender: any[] = [];
      let set = true;
      dataSorted.forEach((item, i, originArr) => {
        if (i < originArr.length - 1) {
          const char = cnchar.spell(item.name)[0];
          const nextChar = cnchar.spell(originArr[i + 1].name)[0];
          if (set) {
            dataRender.push({ type: "char", name: char });
            set = false;
          }
          if (!set) {
            if (char !== nextChar) set = true;
          }
        }
        dataRender.push(item);
      });

      dataRender = dataRender.filter((item: Data) => {
        return item.name.includes(filterKeywords.value);
      });

      return (
        <div class="container">
          <div class="search-container">
            <div class="search-wrapper">
              <i class="search-icon"></i>
              <input
                class="search-input"
                type="text"
                placeholder="请输入城市"
                v-model={filterKeywords.value}
              ></input>
            </div>
          </div>

          <div class="search-placeholder"></div>

          <div class="content-wrapper">
            {props.locationCity && (
              <div class="current-loaction">
                <div class="label">当前定位</div>
                <div
                  class="current-loaction-city"
                  onClick={() => emit("clickLocationCity", props.locationCity)}
                >
                  <i class="current-loaction-icon"></i>
                  <div class="city-name current-location-city-name">
                    {props.locationCity}
                  </div>
                </div>
              </div>
            )}

            {props.currentSelectedCity && (
              <div class="current-selected-warpper">
                <div class="label">所选城市</div>
                <div
                  class="current-selected-city-name city-name"
                  onClick={() =>
                    emit("clickCurrentSelectedCity", props.currentSelectedCity)
                  }
                >
                  {props.currentSelectedCity}
                </div>
              </div>
            )}

            {dataRender.map((data) => (
              <div>
                {data.type === "char" ? (
                  <div class="city-name-wrapper">
                    <div class="city-name" id={`idx-${data.name}`}>
                      {data.name}
                    </div>
                  </div>
                ) : (
                  <div
                    class="city-name-wrapper"
                    onClick={() => selectedCity(data)}
                  >
                    <div class="city-name">{data.name}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div class="index-bar">
            {letterArr.map((code) => (
              <div
                class="index-bar-char-wrapper"
                onTouchstart={indexBarClick}
                data-code={code}>
                <div
                  class={`index-bar-char ${activeCode.value === code ? 'active' : ''}`}
                  data-code={code}>
                  {code}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
  },
});
