<template>
  <div class="title">Todos</div>
  <TodoList></TodoList>
  <div class="pageTail">
    <p>Double-click to edit a todo</p>
    <p>Developed by Raxskle🥤 using Vue</p>
  </div>
</template>

<script setup>
import TodoList from "./components/TodoList.vue";
import {
  useCounterStore,
  useCounterStore2,
  useCounterStore3,
} from "./pinia/index.js";
import { storeToRefs } from "pinia";

// 直接获取对象
const counter = useCounterStore();
console.log(counter.count);
console.log("double", counter.double);

// 解构获取state, getters, actions
// store是一个reactive包装的对象
const { count } = storeToRefs(counter);
// action 可以直接提取
const { increment } = counter;

const counter2 = useCounterStore2();
const counter3 = useCounterStore3();
</script>

<style lang="scss" scoped>
.title {
  font-size: 80px;
  width: 90%;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 40px;
  color: rgb(66, 184, 131);
}

.pageTail {
  > p {
    color: rgb(53, 73, 94);
  }
}
</style>
