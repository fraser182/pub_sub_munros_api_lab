const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(menu){
  this.menu = menu;
  // console.log('this.menu', this.menu // html location from app.js

};


// B then C
SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Munros:munros-loaded', (event) => {
    // console.log('Munros-load: SUBSCRIBE all details all munros', event.detail);
    const nonDuplicateRegions = this.getNonDuplicateRegions(event.detail)
    // console.log('All munros, sorted and non-duplicated ',nonDuplicateRegions);
    this.populate(nonDuplicateRegions);
    // console.log('nonDuplicateRegions', nonDuplicateRegions); // returns all regions (only)
  })
  this.menu.addEventListener('change', (event) => { // changes the selected country from dropdown
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
    this.menu.appendChild(option);
  });
}

SelectView.prototype.getNonDuplicateRegions = function(munros){
  const allMunroRegions = munros.map((munro) => {
    return munro.region;

  });
  // console.log('Mapped munros - showing only regions in new array',allMunroRegions);

  // return allMunroRegions.filter((region, index) => {
  //   return allMunroRegions.indexOf(region) === index;
  // });
  const nonDuplicateRegions = [...new Set(allMunroRegions)];
  return nonDuplicateRegions;
};

module.exports = SelectView;
