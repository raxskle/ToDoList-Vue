import { defineStore } from "pinia";
import { computed, ref } from "vue";
// options stores
export const useCounterStore = defineStore("counter", {
  state: () => {
    return { count: 1 };
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  getters: {
    double: (state) => {
      return state.count * 2;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
// setup stores  两种写法导出后使用是一样的
export const useCounterStore2 = defineStore("counter2", () => {
  const count = ref(0);
  const double = computed(() => {
    return count.value * 2;
  });
  function increment() {
    count.value++;
  }

  return { count, increment, double };
});

// 调用其它stores的数据
export const useCounterStore3 = defineStore("counter3", () => {
  const count = ref(0);
  const value = computed(() => {
    const counter = useCounterStore();
    return counter.count * 2165;
  });

  return { count, value };
});
