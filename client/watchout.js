// start slingin' some d3 here.
var xyCreator = function(boardWidth, boardHeight) {
  return [Math.random() * boardWidth, Math.random() * boardHeight];
};

var numEnemies = function (num) {
  var results = [];
  for (var i = 0; i < num; i++) {
    results.push(xyCreator(100, 100));
  }
  return results;
};

d3.select('.board').selectAll("svg")
  .data([1])
  .enter()
  .append("svg")
  .style("width", "800px")
  .style("height", "600px");


