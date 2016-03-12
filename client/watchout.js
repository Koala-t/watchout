// start slingin' some d3 here.
var xyCreator = function(boardWidth, boardHeight) {
  return [Math.random() * boardWidth, Math.random() * boardHeight];
};

var numEnemies = function (num) {
  var results = [];
  for (var i = 0; i < num; i++) {
    results.push(xyCreator(800, 600));
  }
  return results;
};

var enemyCount = 20;
var enemySpeed = 1000;

d3.select('.board').selectAll('svg')
  .data([1])
  .enter()
  .append('svg')
  .style('width', '800px')
  .style('height', '600px');


d3.select('svg').selectAll('circle')
  .data(numEnemies(debrisCount))
  .enter()
  .append('circle')
  .classed('asteroid', true)
  .attr('r', '15')
  .attr('cx', function (d) { return d[0]; }) //REFACTOR IN ES6
  .attr('cy', function (d) { return d[1]; })
  .style('fill', 'red');




var changeEnemyPositions = function () {
  d3.select('svg').selectAll('circle')
    .data(numEnemies(debrisCount))
    .transition().duration(enemySpeed)
    .attr('cx', function (d) { return d[0]; }) 
    .attr('cy', function (d) { return d[1]; });
};

var shuffleEnemies = function() {
  
};
