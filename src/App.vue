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
