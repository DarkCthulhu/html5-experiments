//content globals
var CANVAS_WIDTH;
var CANVAS_HEIGHT;
var FPF = 90 //frames per fly :D
var MAX_SCREEN_FLIES = 2;
var SCREEN_TIME = 2;
var FLY_IMAGE = 32;

//game-globals
var ctx = null;
var drawArray = [];
var allowance = 20;
var fCount = 0; //number of frames completed by flies in current position
var swatter = null;

//timing and scoring
var timer = 60;
var score = 0;

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
    
    //start the time-loop
    var interval = window.setInterval(function(){
        timer--;
        writeHeader("Time Left: " + timer + " | Score: " + score);
        if(timer <= 0) {
            clearInterval(interval);
            drawArray = [];
            writeHeader("Game Over! | Score: " + score);
        }
    }, 1000);
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
        
        //transformations might not really work at a different resolution
        swatter.setPosition(pos[0]*4 + CANVAS_WIDTH/3.5, -pos[1]*4 + CANVAS_HEIGHT*1.9);
        swatter.draw();
        
        
        var posSwatter = swatter.getPosition();
        for(var i=0;i<MAX_SCREEN_FLIES;i++){
            var player = drawArray[i];
            var posPlayer = player.getPosition();
            if (Math.abs(posSwatter.x-posPlayer.x)<=FLY_IMAGE && Math.abs(posSwatter.y-posPlayer.y)<=FLY_IMAGE){
                var fly = new Fly();
                drawArray[i] = fly;
                
                var splatter = new Splatter(posPlayer.x, posPlayer.y);
                drawArray.push(splatter);
                
                score++;
                break;
            }
        }
        //break; //force exit from loop to detect one finger only (can later allow for multiple)
    
    }    
};

function writeHeader(value){
    $("#connection_state").html(value);
}

//creates the flies
function createElements(){
    for(var i=0;i<MAX_SCREEN_FLIES;i++){
        var fly = new Fly();
        drawArray.push(fly);
    }
}

//updates fly position
function update(){
    if(fCount < FPF){
        fCount++;
    }else{
        fCount = 0;
        for(var i=0;i<MAX_SCREEN_FLIES;i++){
            var fly = drawArray[i];
            fly.setPosition(getRandom(CANVAS_WIDTH - FLY_IMAGE), getRandom(CANVAS_HEIGHT - FLY_IMAGE));
        }
    }
}

//draws flies to screen
function draw() {
    for(var i=0,len=drawArray.length;i<len;i++){
        var item = drawArray[i];
        item.draw();
    }
}
function getRandom(limit){
    return Math.floor((Math.random()*limit)+1);
}
