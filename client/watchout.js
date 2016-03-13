// start slingin' some d3 here.
var collisions = 0, highScore = 0, currScore = 0, numPointsPerSec = 10, fps = 60;
var boardWidth = 800;
var boardHeight = 600;
var scale = .4;
var shipWidth = 500 * scale, shipHeight = 187 * scale;
var enemyCount = 10; // why missing one?
var enemySpeed = 2000;
var recoveryTime = false;

var setBoardLimits = function(value, shipConstraint, boardConstraint) {
  return Math.max(0, Math.min(value, boardConstraint - shipConstraint));
};

var xyCreator = function(width, height) {
  return [Math.random() * width, Math.random() * height];
};

var enemyCreator = function (num) {
  var results = [];
  for (var i = 0; i < num; i++) {// can use <= to add the missing asteroid
    results.push(xyCreator(boardWidth, boardHeight));
  }
  return results;
};

var changeEnemyPositions = function () {

  d3.select('svg').selectAll('.asteroid')
    .data(enemyCreator(enemyCount))
    .transition().duration(enemySpeed)
    .attr('x', function (d) { return d[0]; })  
    .attr('y', function (d) { return d[1]; })
    .style('border','10px solid red');

};

var dragmove = function(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  var newX = setBoardLimits(x - (shipWidth / 2), shipWidth, boardWidth);
  var newY = setBoardLimits(y - (shipHeight / 2), shipHeight, boardHeight);
  debugger;
  d3.select(this).attr('x', newX);
  d3.select(this).attr('y', newY);
};

var drag = d3.behavior.drag()
    .on('drag', dragmove);

var gameOver = function() {
  collisions++;
  currScore = 0;
  highScore = Math.max(currScore, highScore);

  d3.select('.board')
    .transition().duration(500)
    .attr('fill', 'red');
    //TO DO make the board flash red on collision
  d3.select('.collisions').selectAll('span') 
    .text('' + collisions);

  setTimeout(function() {
    recoveryTime = false;
  }, 400);

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

var collisionDetector = function () {
  // debugger;
  var shipPosition = [+d3.select('.player')
                       .attr('x'),
                      +d3.select('.player')
                       .attr('y')];

  var brains = d3.select('svg').selectAll('.asteroid');

  brains[0].forEach(function(element, i, array) {
    var x = +element.attributes.x.value + 30;
    var y = +element.attributes.y.value + 30;

    if (recoveryTime === false && shipPosition[0] < x && x < (shipPosition[0] + shipWidth) && (shipPosition[1]) < y && y < (shipPosition[1] + shipHeight)) {
      recoveryTime = true;
      gameOver();
    }
    // check x + width
    // check y + height
    console.log(element.__data__);
  });
                       
  //TODO evaluate if there is a collision
    //if there is call the gameOver function
};


//make player
d3.select('svg').selectAll('svg')
  .data([1])
  .enter()
  .append('image')
  .classed('player', true)
  .attr('xlink:href', './ship.png')
  .attr('height', shipHeight)
  .attr('width', shipWidth)
  .attr('x', '400')
  .attr('y', '300')
  .style('fill', 'green')
  .call(drag);


//make asteroids
d3.select('svg').selectAll('circle')
  .data(enemyCreator(enemyCount))
  .enter()
  .append('image')
  .classed('asteroid', true)
  .attr('xlink:href', './brain.png')
  .attr('height', 60)
  .attr('width', 60)
  .attr('x', function (d) { return d[0]; }) //REFACTOR IN ES6
  .attr('y', function (d) { return d[1]; })
  .style('fill', 'red');
  // .on('mouseover', function() {
  //   collisions++;
  //   gameOver();
  // });


setInterval(changeEnemyPositions, enemySpeed);
setInterval(collisionDetector, 1000 / fps);
setInterval(moreScore, 1000 / numPointsPerSec);







// boolean set to false
// change it to true when collision
// collision can only occur when false

// with a set timeout to revert to false in a second














