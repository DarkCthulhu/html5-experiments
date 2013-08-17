//content globals
var CANVAS_WIDTH = $(window).width() - 30;
var CANVAS_HEIGHT = $(window).height() - 30;
var FPS = 1;
var MAX_SCREEN_FLIES = 2;
var SCREEN_TIME = 2;


//game-globals
var canvas = null;
var playerArray = [];
var allowance = 20;

$(function(){
	var canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
                      "' height='" + CANVAS_HEIGHT + "'></canvas>");
	
	canvas = canvasElement.get(0).getContext("2d");
	canvasElement.appendTo('body');	
    
    //create game objects
    createElements();
    
    //start draw-loop
	setInterval(function() {
        update();
        draw();
	}, 1000/FPS);
});

function createElements(){
    for(var i=0;i<MAX_SCREEN_FLIES;i++){
        var player = new Fly();
        playerArray.push(player);
    }
}
function update(){
    for(var i=0;i<MAX_SCREEN_FLIES;i++){
        var player = playerArray[i];
        player.setPosition(getRandom(CANVAS_WIDTH - allowance), getRandom(CANVAS_HEIGHT - allowance));
    }
}
function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for(var i=0;i<MAX_SCREEN_FLIES;i++){
        var player = playerArray[i];
        player.draw();
    }
}
function getRandom(limit){
    return Math.floor((Math.random()*limit)+1);
}


//player class
function Fly(){
    this.x = 220;
    this.y = 270;
    this.sprite = Sprite("res/fly.png");
} 

Fly.prototype.setPosition = function(x, y){
    this.x = x;
    this.y = y;
}
Fly.prototype.draw = function() {
    this.sprite.draw(canvas, this.x, this.y);
}





