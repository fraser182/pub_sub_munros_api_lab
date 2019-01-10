const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(element){
  this.element = element;
  // console.log('this.element', this.element // html location from app.js

};

// B then C
SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Munros:munros-loaded', (event) => {
    // console.log('Munros-load: SUBSCRIBE all details all munros', event.detail);
    const nonDuplicateRegions = this.getNonDuplicateRegions(event.detail)
    this.populate(nonDuplicateRegions);
    // console.log('nonDuplicateRegions', nonDuplicateRegions); // returns all regions (only)
  })
  this.element.addEventListener('change', (event) => { // changes the selected country from dropdown
    // console.log('Return name of region selected:', event.target.value);
    const selectedRegion = event.target.value;
    // console.log('SelectView:PUBLISH eventlistener (change drop down) - country region', selectedRegion);
    PubSub.publish('SelectView:munro-region-selected', selectedRegion); // sending a region(only)
  });
}

SelectView.prototype.populate = function(uniqueRegions){
  uniqueRegions.forEach((region) => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    this.element.appendChild(option);
  });
}

SelectView.prototype.getNonDuplicateRegions = function(munros){
  const allMunroRegions = munros.map((munro) => {
    return munro.region;
  });

  // return allMunroRegions.filter((region, index) => {
  //   return allMunroRegions.indexOf(region) === index;
  // });
  const nonDuplicateRegions = [...new Set(allMunroRegions)];
  return nonDuplicateRegions;

};



module.exports = SelectView;
