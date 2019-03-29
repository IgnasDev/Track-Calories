// LOCAL STORAGE controller
const storageCTRL = (function() {
  // public methods
  return {
    storeItem: function(item) {
      let items;
      // check if any item in ls
      if(localStorage.getItem('items') === null) {
        items = [];
        // push new item
        items.push(item);
        // set ls
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // get what already in ls
        items = JSON.parse(localStorage.getItem('items'));
        // push new item
        items.push(item);
        // re set ls
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    // get items from storage
    getItemsFromStorage: function() {
      let items;
      if(localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    // update local storage with updated item
    updateLocalStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index) {
        if(updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    // delet item from local storage
    deleteItemsFromStorage: function(itemDelete) {
     let items = JSON.parse(localStorage.getItem('items'));

     items.forEach(function(item, index) {
       if(item.id === itemDelete.id) {
         items.splice(index, 1);
       }
     });
     localStorage.setItem('items', JSON.stringify(items));
   },
   // clear local storage
   clearLocal: function() {
     let items = [];
     localStorage.setItem('items', JSON.stringify(items));
   }
  }
})()
