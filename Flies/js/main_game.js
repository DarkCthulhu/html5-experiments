//content globals
var CANVAS_WIDTH = $(window).width() - 30;
var CANVAS_HEIGHT = $(window).height() - 30;
var FPF = 60 //frames per fly :D
var MAX_SCREEN_FLIES = 2;
var SCREEN_TIME = 2;


//game-globals
var ctx = null;
var playerArray = [];
var allowance = 20;
var fCount = 0; //number of frames completed by flies in current position

$(function(){
	var canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
                      "' height='" + CANVAS_HEIGHT + "'></ctx>");
	
	ctx = canvasElement.get(0).getContext("2d");
	canvasElement.appendTo('body');	
    
    //create game objects
    createElements();
    
    //Leap Controller
    var controller = new Leap.Controller();

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

        var radius = Math.min(600/Math.abs(pos[2]),20);
        ctx.beginPath();
        ctx.arc(pos[0]*2,-pos[1]*2,radius,0,2*Math.PI);
        ctx.fill();
        writeHeader(pos[0] + " -- " + pos[1]);
    }
};


function writeHeader(value){
    $("#connection_state").html(value);
}

function createElements(){
    for(var i=0;i<MAX_SCREEN_FLIES;i++){
        var player = new Fly();
        playerArray.push(player);
    }
}
function update(){
    if(fCount < FPF){
        fCount++;
    }else{
        fCount = 0;
        for(var i=0;i<MAX_SCREEN_FLIES;i++){
            var player = playerArray[i];
            player.setPosition(getRandom(CANVAS_WIDTH - allowance), getRandom(CANVAS_HEIGHT - allowance));
        }
    }
}
function draw() {
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
    this.sprite.draw(ctx, this.x, this.y);
}






