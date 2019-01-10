const PubSub = require('../helpers/pub_sub.js');
const MunroDetailView = require('./munro_detail_view.js');

const MunroListView = function(container){
  this.container = container;
};

// F
MunroListView.prototype.bindEvents = function(){
  PubSub.subscribe('Munros:all-munros-with-selected-region-found', (event) => {
    this.container.innerHTML= '';
    this.render(event.detail);
// console.log('Munros: SUBSCRIBE - all munros with selected region', event.detail);
  });
}


MunroListView.prototype.render = function (munros) {
  munros.forEach((munro) => {
    const munroDetail = new MunroDetailView();
    const munroDiv = munroDetail.createMunroDetail(munro);
    this.container.appendChild(munroDiv);
  });
};

module.exports = MunroListView;
