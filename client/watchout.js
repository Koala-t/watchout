// start slingin' some d3 here.
var collisions = 0, highScore = 0, currScore = 0, numPointsPerSec = 10;
var enemyCount = 10; // why missing one?
var enemySpeed = 2000;

var xyCreator = function(boardWidth, boardHeight) {
  return [Math.random() * boardWidth, Math.random() * boardHeight];
};

var enemyCreator = function (num) {
  var results = [];
  for (var i = 0; i < num; i++) {// can use <= to add the missing asteroid
    results.push(xyCreator(800, 600));
  }
  return results;
};

var changeEnemyPositions = function () {
  d3.select('svg').selectAll('.asteroid')
    .data(enemyCreator(enemyCount))
    .transition().duration(enemySpeed)
    .attr('x', function (d) { return d[0]; }) 
    .attr('y', function (d) { return d[1]; });
};


var dragmove = function(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr('cx', x);
  d3.select(this).attr('cy', y);
};

var drag = d3.behavior.drag()
    .on('drag', dragmove);

var gameOver = function() {
  currScore = 0;
  highScore = Math.max(currScore, highScore);

  d3.select('.board')
    .transition().duration(500)
    .attr('background-image', 'null')
    .style('background-color', 'red')
    .transition().duration(500)
    .style('background-color', 'black');
    //TO DO make the board flash red on collision

  d3.select('.collisions').selectAll('span') 
    .text('' + (collisions));
};

var moreScore = function () {
  currScore++;
  d3.select('.current').selectAll('span') 
    .text('' + currScore);

  highScore = Math.max(highScore, currScore);
  d3.select('.highscore').selectAll('span') 
    .text('' + highScore);
};

// var click = function(){
//   // Ignore the click event if it was suppressed
//   // if (d3.event.defaultPrevented) return;
//   // Extract the click location\
//   debugger;    
//   var point = d3.mouse(this);
//   var p = {x: point[0], y: point[1] };
// };
//from a copy-paste; what does this accomplish?

d3.select('.board').selectAll('svg')
  .data([null])
  .enter()
  .append('svg')
  .style('width', '800px')
  .style('height', '600px');


//make player
d3.select('svg').selectAll('svg')
  .data([1])
  .enter()
  .append('circle')
  .classed('player', true)
  .attr('r', '10')
  .attr('cx', '400')
  .attr('cy', '300')
  .style('fill', 'green')
  .call(drag);


//make asteroids
d3.select('svg').selectAll('circle')
  .data(enemyCreator(enemyCount))
  .enter()
  .append('image')
  .classed('asteroid', true)
  .attr('xlink:href', './asteroid.png')
  .attr('height', 60)
  .attr('width', 60)
  .attr('x', function (d) { return d[0]; }) //REFACTOR IN ES6
  .attr('y', function (d) { return d[1]; })
  .style('fill', 'red')
  .on('mouseover', function() {
    collisions++;
    gameOver();
  });



setInterval(changeEnemyPositions, enemySpeed);




setInterval(moreScore, 1000 / numPointsPerSec);

























