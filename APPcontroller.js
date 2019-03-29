// APP controller
const APPctrl = (function(storage,localctrl, ui) {
  // Get ui selectors
const DOM = ui.getUIselector();
// Fetch items from data structure
const items = storage.getData();
// load event listener
const loadEventListener = function() {
  // Add item event
  DOM.add_button.addEventListener('click', itemAddSubmit);
  // Disable submit on enter
  document.addEventListener('keypress', function(e){
    if(e.keyCode === 13 || e.which === 13){
      e.preventDefault();
      return false;
    }
  });
  // Edit item event
  DOM.item_list.addEventListener('click', itemEditClick);
  // update item event
  DOM.update_button.addEventListener('click', itemUpdateSubmit);
  // delete item event
  DOM.delete_button.addEventListener('click', itemDeleteSubmit);
  // back item event
  DOM.back_button.addEventListener('click', function(e) {
    e.preventDefault();
    // clear edit state
    ui.clearEditState();
    // clear fields
    ui.clearInputs();
  });
  // clear all event
  DOM.clear_button.addEventListener('click', clearAll);
};
// add submit
function itemAddSubmit(e) {
  // prevent default behaviour
  e.preventDefault();
  // get Input values
  const inputValues = ui.getInputValues();
  // Check input
  if(inputValues.name !== '' && inputValues.calories !== '') {
  // show ul element
  DOM.item_list.style.display = 'block';
  // then add item to the storage
  const newItem = storage.addItem(inputValues);
  // update UI
  ui.addListItem(newItem);
  // get total calories
  const calories = storage.getTotalCalories();
  // show total calories
  ui.showTotalCalories(calories);
  // send item to local storage
  localctrl.storeItem(newItem);
  // clear fields
  ui.clearInputs();
  } else {
    return;
  }
};
// Click edit item
function itemEditClick(e) {
  // prevent default behaviour
  e.preventDefault();
  // check if traget button was clicked
  if(e.target.classList.contains('fa')) {
    // get item by ID
    const targetID = parseInt(e.target.parentNode.parentNode.id);
    storage.getItemById(targetID);
    // get current item
    const currentItem = storage.getCurrentItem();
    // add item to the form
    ui.addItemToForm(currentItem);
    // show edit state
    ui.showEditState();
  }
}
function itemUpdateSubmit(e) {
    // get current item
    const currentItem = storage.getCurrentItem();
    // get input values
    const inputValues = ui.getInputValues();
    // update item
    const updatedItem =  storage.updateItem(inputValues);
    // show total calories
    const calories = storage.getTotalCalories();
    ui.showTotalCalories(calories);
    // update list item
    ui.updateListItem(currentItem);
    // update Item in the local storage
    localctrl.updateLocalStorage(updatedItem);
    // clear edit state
    ui.clearEditState();
    // clear fields
    ui.clearInputs();
    // prevent default behaviour
    e.preventDefault();
}
function itemDeleteSubmit(e) {
   // get current item
   const currentItem = storage.getCurrentItem();
   // remove from data structure
   storage.deleteItem(currentItem.id);
   // delete list
   ui.deleteListItem(currentItem.id);
   // delete from local storage
   storageCTRL.deleteItemsFromStorage(currentItem);
   // clear edit state
   ui.clearEditState();
   // clear fields
   ui.clearInputs();
   // show total calories
   const calories = storage.getTotalCalories();
   ui.showTotalCalories(calories);
  // prevent default behaviour
  e.preventDefault();
}
function clearAll(e) {
  // clear all items from data structure
  storage.clearAllItems();
  // remove all list elements
  ui.removeAllListItems();
  // clear lcoal
  storageCTRL.clearLocal();
  // hide ul
  ui.hideList();
  // clear calories
  const calories = storage.getTotalCalories();
  ui.showTotalCalories(calories);
 // prevent default behaviour
 e.preventDefault();
}
// Public variable and methods
return {
  init: function() {
    // Check items
    if(items.length === 0) {
      // hide ul element
      ui.hideList();
    } else {
      // Populate list with items
      ui.populateItemList(items);
      // get total calories
     const calories = storage.getTotalCalories();
     // show total calories
     ui.showTotalCalories(calories);
    }
     // load event handler
     loadEventListener();
     // clear edit state(buttons)
     ui.clearEditState();
  }
}
})(ITEMctrl,storageCTRL, UIctrl);
// Init application
APPctrl.init();
