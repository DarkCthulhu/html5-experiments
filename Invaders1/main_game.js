var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 320;
var canvas = null;
var FPS = 30;

$(function(){
	var canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
                      "' height='" + CANVAS_HEIGHT + "' style='border: 2px solid #000000'></canvas>");
	
	canvas = canvasElement.get(0).getContext("2d");
	canvasElement.appendTo('body');
	
	//create handlers
	$(document).bind("keydown", "left", function(){player.moveLeft();});
	$(document).bind("keydown", "right", function(){player.moveRight();});
	$(document).bind("keydown", "up", function(){player.moveUp();});
	$(document).bind("keydown", "down", function(){player.moveDown();});
	
	setInterval(function() {
	update();
	draw();
	}, 1000/FPS);
});

var player = {
  color: "#00A",
  x: 220,
  y: 270,
  width: 32,
  height: 32,
  move: 5,
  
  draw: function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  },
  
  moveLeft: function() {
	if(this.x - this.move > 0)
		this.x = this.x - this.move;
	else
		this.x = 0;
  },
  moveRight: function() {
	if(this.x + this.move < (CANVAS_WIDTH - this.width))
		this.x = this.x + this.move;
	else
		this.x = (CANVAS_WIDTH - this.width);
  },
  moveUp: function() {
	if(this.y + this.move > 0)
		this.y = this.y - this.move;
	else
		this.y = 0;
  },
  moveDown: function() {
	if(this.y + this.move < (CANVAS_HEIGHT - this.height))
		this.y = this.y + this.move;
	else
		this.y = (CANVAS_HEIGHT - this.height);
  }
};

var bullets = [];


function update(){

}

function draw() {
	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	player.draw();
}




