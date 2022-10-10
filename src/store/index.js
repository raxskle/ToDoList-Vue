import { createStore } from "vuex";

let store = createStore({
  state() {
    let itemList = localStorage.getItem("itemList");
    if (!itemList) {
      itemList = [];
      localStorage.setItem("itemList", JSON.stringify(itemList));
    } else {
      itemList = JSON.parse(itemList);
    }

    return {
      itemList,
    };
  },
  mutations: {
    addItem(state, item) {
      state.itemList.push(item);
      console.log(item);
      localStorage.setItem("itemList", JSON.stringify(state.itemList));
    },
    deleteItem(state, id) {
      state.itemList.forEach((item, index) => {
        if (item.id == id) {
          state.itemList.splice(index, 1);
        }
      });
      localStorage.setItem("itemList", JSON.stringify(state.itemList));
    },
    changeItemState(state, id) {
      state.itemList.forEach((item, index) => {
        if (item.id == id) {
          state.itemList[index].isFinished = !state.itemList[index].isFinished;
          console.log(id, state.itemList[index].isFinished);
        }
      });
      localStorage.setItem("itemList", JSON.stringify(state.itemList));
      console.log(state.itemList);
    },
    changeAllItemState(state) {
      let ifAllF = true;
      state.itemList.forEach((item, index) => {
        if (item.isFinished == false) {
          item.isFinished = true;
          ifAllF = false;
        }
      });
      if (ifAllF == true) {
        state.itemList.forEach((item, index) => {
          item.isFinished = false;
        });
      }

      localStorage.setItem("itemList", JSON.stringify(state.itemList));
    },
    changeItemText(state, newItem) {
      state.itemList.forEach((item, index) => {
        if (item.id == newItem.id) {
          state.itemList[index].text = newItem.text;
        }
      });

      localStorage.setItem("itemList", JSON.stringify(state.itemList));
    },
  },
  actions: {},
});

export default store;
