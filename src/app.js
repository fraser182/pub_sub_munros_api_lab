const Munros = require('./models/munros.js')
const MunroListView = require('./views/munro_list_view.js');
const SelectView = require('./views/select_view.js');



document.addEventListener('DOMContentLoaded', () => {
  console.log("JavaScript loaded");


  const selectElement = document.querySelector('#munro-regions')
  const selectView = new SelectView(selectElement);
  selectView.bindEvents();

  const container = document.querySelector('#munro-list')
  const munroList = new MunroListView(container);
  munroList.bindEvents();


  const munros = new Munros();
  munros.bindEvents();
  munros.getData();

});
