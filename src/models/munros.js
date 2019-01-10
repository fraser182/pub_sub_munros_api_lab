const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Munros = function(){
  this.munros = [];
}

// D and E
Munros.prototype.bindEvents = function(){
  PubSub.subscribe('SelectView:munro-region-selected', (event) => {
    const selectedRegion = event.detail;
    // console.log('Munros: SUBSCRIBE - eventlistener(change drop down)-country index:', selectedRegion);
    const regions = this.findRegion(selectedRegion);
    // console.log('Munros: PUBLISH - all munros with selected region', regions);
    PubSub.publish('Munros:all-munros-with-selected-region-found', regions);
  });
}

Munros.prototype.findRegion = function(region){
  return this.munros.filter((munro) => {
    return munro.region === region;
  })
}
// A
Munros.prototype.getData = function () {
  const request = new Request("https://munroapi.herokuapp.com/munros");
  request.get().then((data) => {
    this.munros = data;
    // console.log((this.munros)); // this.munros is all the munros data being passed
    PubSub.publish('Munros:munros-loaded', this.munros);
  });
};


module.exports = Munros;
