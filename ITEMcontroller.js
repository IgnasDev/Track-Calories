  // Item controller
const ITEMctrl = (function() {
  // Item constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
  // Data structure / state
  const data = {
    items: storageCTRL.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  };
  // Public variable and methods
  return {
    // add item
    addItem: function(inputObj) {
      // create unique ID
      let ID = '';
      if(data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      let name = inputObj.name;
      let calories = parseInt(inputObj.calories);
      let newItem = new Item(ID, name, calories);
      data.items.push(newItem);
      return newItem;
    },
    clearAllItems: function() {
      data.items = [];
    },
    deleteItem: function(id) {
      // get all ids form data structure
      let ids = data.items.map(function(item) {
        return item.id;
      })
      // get index of that item
      let itemIndex = data.items.indexOf(id);
      // remove that item
      data.items.splice(itemIndex, 1);
    },
    // Send data
    getData: function() {
      return data.items;
    },
    // get item by ID
    getItemById: function(id) {
      let currentItem = null;
      data.items.forEach(function(item) {
        // check if item id is the current item
        if(item.id === id) {
          currentItem = item;
        }
      })
      ITEMctrl.setCurrentItem(currentItem);
      return currentItem;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    // get total calories
    getTotalCalories: function() {
      let total = 0;
      if(data.items.length !== 0) {
        data.items.forEach(function(item) {
          total += item.calories;
        })
      }
      data.totalCalories = total;
      return total;
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    updateItem: function(itm) {
      let updatedItem = null;
      data.items.forEach(function(item) {
        if(item.id === data.currentItem.id) {
          item.name = itm.name;
          item.calories = parseInt(itm.calories);
          updatedItem = item;
        }
      })
      data.totalCalories = ITEMctrl.getTotalCalories();
      return updatedItem;
    },
    test: function() {
      return data;
    }
  }
})();
