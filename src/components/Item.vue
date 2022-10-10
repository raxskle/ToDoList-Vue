<template>
  <div class='item' @mouseenter="showDelete" @mouseleave="fadeDelete">
    <div class='toggle' @click="changeItemState">
      <img v-if="item.isFinished" class='toggleImg' src="../assets/image/273-checkmark.png" /> 
      <!-- item.isFinished依赖追踪有效 -->
    </div>

    <div class='itemText' @dblclick="showChangeText">
      <p :class=ifFinished >
        {{item.text}}
      </p>
      <input type="text" class='changeText' @blur="fadeChangeText" ref="changeinput"/>
    </div>

    <div ref="deleteIcon" class='deleteItem' @click="deleteItem">
    </div>

  </div>
</template>

<script setup>
import { computed, ref, toRefs, watch } from 'vue';
import { useStore } from "vuex";
let props = defineProps(["item","index"]);
let { item, index } = toRefs(props);

let store = useStore();


let ifFinished = computed(() => {
  return  item.value.isFinished == true ? "finished" : "";
});
// computed会追踪store里的依赖，并自动更新
let deleteItem = () =>  store.commit("deleteItem", item.value.id);
let changeItemState = () =>  store.commit("changeItemState", item.value.id);
let changeItemText = (newItem) => store.commit("changeItemText", newItem);

let deleteIcon = ref(null);
let showDelete = () => {
  deleteIcon.value.style.visibility = "visible";
}
let fadeDelete = () => {
  deleteIcon.value.style.visibility = "hidden";
}
// 拿到修改文本的输入框
let changeinput = ref(null);

let showChangeText = () => {
  const changeinput = document.querySelectorAll(".changeText")[index.value];
  changeinput.style.display = "flex";
  changeinput.value = item.value.text;
  changeinput.focus();
}
let fadeChangeText = () => {
  const changeinput = document.querySelectorAll(".changeText")[index.value];
  if (changeinput.value != "") {
    changeinput.style.display = "none";
    let newItem = {
      id: item.value.id,
      text: changeinput.value,
    }
    changeItemText(newItem);    
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key == "Enter" || e.key == "NumpadEnter") {
    if (changeinput.value.style.display != "none") {
      fadeChangeText();
    }
  }
})

</script>

<style lang="scss" scoped>

.item {
  background-color: white;
  min-height: 56px;
  width: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  border-top: solid 1px rgb(221, 221, 221);
  flex-direction: row;
  justify-content: space-between;
  .toggle {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    border: solid 2px rgb(8, 9, 11);
    cursor: pointer;

    .toggleImg {
      width: 75%;
      height: 75%;
    }
  }
  .itemText {
    flex-grow: 1;
    margin-left: 20px;
    margin-right: 20px;
    min-height: 50px;
    max-width: 640px;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;  
    position: relative;  
    >p{
      font-size: 18px;
      margin-top: 10px;
      margin-bottom: 10px;
      line-height: 35px;
      word-wrap: break-word;
      overflow: hidden;
      word-break:break-all;   
      transition: all .3s;    
    }

    .finished {
      text-decoration: line-through;
      color: rgb(159, 159, 159);
    }

    .changeText {
      display: none;
      position: absolute;
      top: 5%;
      left: 0;
      box-sizing: border-box;
      height: 90%;
      width: 100%;
      outline:none;
      font-size: 18px;
      background-color: rgb(255, 255, 255);
      border: solid 1px rgb(44, 52, 59);
    }
  }
  .deleteItem {
    visibility: hidden;
    width: 15px;
    height: 15px;
    margin-right: 10px;
    background-size: 100% 100%;
    background-image: url("../assets/image/272-cross.png");
    cursor: pointer;
  }


}
</style>
