// UI controller
const UIctrl = (function() {
  const DOM = {
    item_list: document.getElementById('item-list'),
    add_button: document.getElementById('add-item'),
    meal_input: document.getElementById('item-name'),
    delete_button: document.getElementById('dlt-btn'),
    update_button: document.getElementById('upd-btn'),
    back_button: document.getElementById('bck-btn'),
    clear_button: document.getElementById('clr-btn'),
    calories_input: document.getElementById('item-calories'),
    total_calories: document.getElementById('total-calories')
  }
// Public variable and methods
return {
  // Add item to the list
  addListItem: function(item) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.id = item.id;
    li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="fa fa-pencil"></i></a>`;
    DOM.item_list.insertAdjacentElement('beforeend', li);
  },
  // add item to the form
  addItemToForm: function(item) {
    DOM.meal_input.value = item.name;
    DOM.calories_input.value = item.calories;
  },
  // clear inputs
  clearInputs: function() {
    DOM.meal_input.value = '';
    DOM.calories_input.value = '';
  },
  // clear edit state(buttons)
  clearEditState: function() {
    DOM.delete_button.style.display = 'none';
    DOM.update_button.style.display = 'none';
    DOM.back_button.style.display = 'none';
    DOM.add_button.style.display = 'inline';
  },
  deleteListItem: function(id) {
    document.getElementById(id).remove();
  },
  // show edit state(buttons)
  showEditState: function() {
    DOM.delete_button.style.display = 'inline';
    DOM.update_button.style.display = 'inline';
    DOM.back_button.style.display = 'inline';
    DOM.add_button.style.display = 'none';
  },
  // Share UIselectors
  getUIselector: function() {
    return DOM;
  },
  // Get input values
  getInputValues: function() {
     return {
       name: DOM.meal_input.value,
       calories: DOM.calories_input.value
     }
  },
  // hide ul element if data.items is empty
  hideList: function() {
    DOM.item_list.style.display = 'none';
  },
  removeAllListItems: function() {
    // get all list items
    let allListItems = document.querySelectorAll('collection-item');
    // conver nodes to array
    allListItems = Array.from(allListItems);
    // remove all list
    allListItems.forEach(function(item) {
      item.remove();
    })
  },
  // Populate item list
  populateItemList: function(items) {
    let html = '';
    items.forEach(function(item) {
      html += `<li class="collection-item" id="${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="fa fa-pencil"></i>
        </a>
      </li>`;
    })
    DOM.item_list.innerHTML = html;
  },
  updateListItem: function(item) {
    document.getElementById(`${item.id}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
    <a href="#" class="secondary-content">
      <i class="fa fa-pencil"></i>
    </a>`;
  },
  // show total calories
  showTotalCalories: function(calories) {
   DOM.total_calories.innerText = calories;
  }
}
})();
