//content globals
var CANVAS_WIDTH;
var CANVAS_HEIGHT;
var FPF = 60 //frames per fly :D
var MAX_SCREEN_FLIES = 2;
var SCREEN_TIME = 2;
var SWATTER_IMAGE = 32;
var PLAYER_IMAGE = 32;

//game-globals
var ctx = null;
var playerArray = [];
var allowance = 20;
var fCount = 0; //number of frames completed by flies in current position
var swatter = null;

$(function(){
	CANVAS_WIDTH = document.body.clientWidth;
    CANVAS_HEIGHT = document.body.clientHeight;
    
    var canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
                      "' height='" + CANVAS_HEIGHT + "'></ctx>");
	
	ctx = canvasElement.get(0).getContext("2d");
    canvasElement.appendTo('body');	
    //create game objects
    createElements();
    
    //Leap Controller
    var controller = new Leap.Controller();
    swatter = new Swatter();

    //initialize the controller
    controller.on('connect', function() {
      writeHeader("Successfully connected.");
    });
    controller.on('disconnect', function() {
      writeHeader("A Leap device has been disconnected.");
    });
    controller.on('deviceConnected', function() {
      console.log("A Leap device has been connected.");
    });
    controller.on('deviceDisconnected', function() {
      console.log("A Leap device has been disconnected.");
    });

    //start the frame-loop
    controller.loop(drawFingers);
});


//draws fingers detected by the leap-motion sensor
function drawFingers(args) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    //update and draw the objects on screen
    update();
    draw();
    
    //find the fingers on screen
    var pointablesMap = args.pointablesMap;
    for (var i in pointablesMap) {
        var pointable = pointablesMap[i];
        var pos = pointable.tipPosition;
        
        swatter.setPosition(pos[0]*4 + CANVAS_WIDTH/3.5, -pos[1]*4 + CANVAS_HEIGHT*1.9);
        swatter.draw();
        var posSwatter = swatter.getPosition();
        for(var i=0;i<MAX_SCREEN_FLIES;i++){
            var player = playerArray[i];
            var posPlayer = player.getPosition();
            if (Math.abs(posSwatter.x-posPlayer.x)<=32 && Math.abs(posSwatter.y-posPlayer.y)<=32){
                var fly = new Fly();
                playerArray[i] = fly;
                
                var splatter = new Splatter(posPlayer.x, posPlayer.y);
                playerArray.push(splatter);
                
                
                
                break;
            }
        }
        break; //force exit from loop to detect one finger only (can later allow for multiple)
    
    }    
};

function writeHeader(value){
    $("#connection_state").html(value);
}

//creates the flies
function createElements(){
    for(var i=0;i<MAX_SCREEN_FLIES;i++){
        var player = new Fly();
        playerArray.push(player);
    }
}

//updates fly position
function update(){
    if(fCount < FPF){
        fCount++;
    }else{
        fCount = 0;
        for(var i=0;i<MAX_SCREEN_FLIES;i++){
            var player = playerArray[i];
            player.setPosition(getRandom(CANVAS_WIDTH), getRandom(CANVAS_HEIGHT));
        }
    }
}

//draws flies to screen
function draw() {
    for(var i=0,len=playerArray.length;i<len;i++){
        var item = playerArray[i];
        item.draw();
    }
}
function getRandom(limit){
    return Math.floor((Math.random()*limit)+1);
}

//player class
function Fly(){
    this.x = 9999;
    this.y = 9999;
    this.sprite = Sprite("res/fly.png");
} 

Fly.prototype.setPosition = function(x, y){
    this.x = x;
    this.y = y;
}
Fly.prototype.getPosition = function(){
    return {
        x: this.x,
        y: this.y
    };
}
Fly.prototype.draw = function() {
    this.sprite.draw(ctx, this.x, this.y);
}

//swatter class
function Swatter(){
    this.x = 9999;
    this.y = 9999;
    this.sprite = Sprite("res/swatter.png");
}
Swatter.prototype.setPosition = function(x, y){
    this.x = x;
    this.y = y;
}
Swatter.prototype.getPosition = function(){
    return {
        x: this.x,
        y: this.y
    };
}
Swatter.prototype.draw = function() {
    this.sprite.draw(ctx, this.x, this.y);
}

//Splatter
function Splatter(x, y){
    this.x = x;
    this.y = y;
    this.sprite = Sprite("res/splatter.png");
}
Splatter.prototype.draw = function() {
    this.sprite.draw(ctx, this.x, this.y);
}
