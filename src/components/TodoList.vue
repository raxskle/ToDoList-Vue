<template>
  <div class="todos">
    <div class="header">
      <div class="tickAll" @click="changeAllItemState"></div>
      <input
        type="text"
        ref="input"
        v-model="newItem"
        autoComplete="off"
        name="newTodo"
        class="newTodoInput"
        placeholder=" What needs to be done?"
      />
      <div className="submit" @click="saveItem">save</div>
    </div>
    <div class="list">
      <Item
        v-for="(item, index) in itemList"
        :key="index"
        :index="index"
        :item="item"
      ></Item>
    </div>
    <div class="footer">
      <div class="itemNums">{{ leftItemNum }} {{ leftitemsTips }}</div>
      <div class="controller">
        <div :class="allClassName" @click="changeMode('all')">All</div>
        <div :class="activeClassName" @click="changeMode('active')">Active</div>
        <div :class="completedClassName" @click="changeMode('completed')">
          Completed
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import { ref, watch } from "vue";
const store = useStore();

// 筛选模式
let mode = ref("all");
mode.value = localStorage.getItem("mode");
if (!mode.value) {
  mode.value = "all";
  localStorage.setItem("mode", mode.value);
}

let changeMode = (newmode) => {
  console.log(newmode);
  mode.value = newmode;
  localStorage.setItem("mode", mode.value);
};

let allClassName = computed(() => {
  if (mode.value == "all") {
    return "all selected";
  } else {
    return "all unselected";
  }
});

let activeClassName = computed(() => {
  if (mode.value == "active") {
    return "active selected";
  } else {
    return "active unselected";
  }
});

let completedClassName = computed(() => {
  if (mode.value == "completed") {
    return "completed selected";
  } else {
    return "completed unselected";
  }
});

let itemList = computed(() => {
  if (mode.value == "all") {
    return store.state.itemList;
  } else if (mode.value == "active") {
    let list = [];
    store.state.itemList.forEach((item) => {
      if (item.isFinished == false) {
        list.push(item);
      }
    });
    return list;
  } else if (mode.value == "completed") {
    let list = [];
    store.state.itemList.forEach((item) => {
      if (item.isFinished == true) {
        list.push(item);
      }
    });
    return list;
  }
});

let addItem = (item) => store.commit("addItem", item);
let changeAllItemState = () => store.commit("changeAllItemState");
// let toPostAddLikes = () => store.dispatch('toPostAddLikes');
console.log(itemList.value);

let newItem = ref("");
let saveItem = () => {
  if (newItem.value != "") {
    let item = {
      id: Date.now(),
      text: newItem.value,
      isFinished: false,
    };
    addItem(item);
    newItem.value = "";
  }
};

let input = ref(null);
window.addEventListener("keydown", (e) => {
  if (e.code == "Enter" || e.code == "NumpadEnter") {
    let timer = setTimeout(() => {
      saveItem();
    }, 100);
    watch(newItem, () => {
      clearTimeout(timer);
    });
    // 当按完enter又有输入时不保存
  }
});
// window.addEventListener("keydown", (e) => {
//   if (e.code == "Enter" || e.code == "NumpadEnter") {
//     saveItem();
//   }
// })
// 只这样写的话会造成中文输入法写英文时按enter导致误保存

// 左下角
// let leftItemNum = ref(0);
// itemList.value.forEach((item) => {
//   if (item.isFinished == false) {
//     leftItemNum.value++;
//   }
// })

// let leftitemsTips = computed(() => {
//   return leftItemNum.value == 1 ? "item left" : "items left";
// });

// watch(leftItemNum, (newval) => {
//   if (newval == 1) {
//     leftitemsTips = "item left"
//   } else {
//     leftitemsTips = "items left"
//   }
// })
// 这样写computed和wacth都不会变，因为itemList只有第一次forEach统计了，之后都没变

let leftItemNum = computed(() => {
  let num = 0;
  itemList.value.forEach((item) => {
    if (item.isFinished == false) {
      num++;
    }
  });
  return num;
});
let leftitemsTips = computed(() => {
  return leftItemNum.value == 1 ? "item left" : "items left";
});
// 这样写会保持leftItemNum实时追踪，从而leftitemsTips响应
</script>

<style lang="scss" scoped>
.todos {
  width: 90%;
  max-width: 750px;
  min-width: 300px;
  margin-bottom: 50px;
  border-radius: 4px;
  box-shadow: 0px 5px 25px 8px rgba(53, 73, 94, 0.241);
  position: relative;
}

.header {
  flex-direction: row;
  width: 100%;
  background-color: white;
  height: 70px;
  border-radius: 4px 4px 0px 0px;
  box-sizing: border-box;
  padding-right: 3px;
  .tickAll {
    background-image: url("../assets/image/216-star-empty.png");
    background-size: 100% 100%;
    width: 25px;
    height: 25px;
    margin: 10px;
    cursor: pointer;
  }
  > input {
    flex: 1;
    box-sizing: border-box;
    height: 90%;
    background: none;
    outline: none;
    border: none;
    font-size: 16px;
  }
  .submit {
    margin: 10px;
    cursor: pointer;
  }
}

.footer {
  flex-direction: row;
  justify-content: center;
  position: relative;
  height: 50px;
  width: 100%;
  background-color: white;
  border-radius: 0px 0px 4px 4px;
  border-top: solid 1px rgb(221, 221, 221);

  @media screen and (max-width: 500px) {
    .itemNums {
      position: absolute;
      left: 0;
      margin-left: 20px;
      display: none;
    }
  }

  @media screen and (min-width: 500px) {
    .itemNums {
      position: absolute;
      left: 0;
      margin-left: 20px;
    }
  }
}

.controller {
  flex-direction: row;
  > div {
    border-radius: 6px;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
    margin: 5px;
    border: 1px solid transparent;
    cursor: pointer;
  }
  .selected {
    border: solid 1px rgb(66, 184, 131);
  }

  .unselected {
    &:hover {
      border: solid 1px rgba(66, 184, 131, 0.308);
    }
  }
}

.list {
  width: 100%;
}
</style>
