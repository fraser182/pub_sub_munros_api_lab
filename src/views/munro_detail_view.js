const MunroDetailView = function(){

}

MunroDetailView.prototype.createMunroDetail = function (munro) {

  const munroDiv = document.createElement('div');

  const header = document.createElement('h1')
  header.textContent = munro.name;
  munroDiv.appendChild(header);

  const detailList = document.createElement('ul');
  const heightItem = document.createElement('li');
  heightItem.textContent = `Height: ${munro.height}`;
  detailList.appendChild(heightItem);

  const meaningItem = document.createElement('li');
  meaningItem.textContent = `Meaning: ${munro.meaning}`;
  detailList.appendChild(meaningItem);

  munroDiv.appendChild(detailList);

  return munroDiv;
};


module.exports = MunroDetailView;
;
