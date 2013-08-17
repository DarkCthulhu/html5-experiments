/*
 * Do it.
 *
 */

var top = false, bottom = false, left = false, right = false;
var context = null;
var phase1 = true;
var phase2 = false;
var phase3 = false;
var phase4 = false;


this.on('start', function(){
  	context = this;
    this.thrusters.left(true);
});

this.on('sensor:top', function(contact){
  top = !top;
  if(contact){
    if(top && left){
      if(phase4){
        goRight();
        return;
      }
        phase1 = false;
      	phase2 = false;
     	phase3 = true;
    }
    if(phase3){
     disableAll();
     goDown();
     return;
    }
    if(phase4){
     disableAll();
     goRight();
     return;
    }
  }else{
    if(phase4){
     disableAll();
     goUp();
     return;
    }
  }
});

this.on('sensor:right', function(contact){
  right = !right;
  if(contact){
    if(right && bottom){
      phase3 = false;
      phase4 = true; 
  	}
    if(phase4){
     disableAll();
     goUp();
     return; 
    }
    if(phase1){
      disableAll();
      goDown(); 
      return;
    }
  }
});


this.on('sensor:left', function(contact){
  left = !left;
  if(contact){
    if(phase2){
     goUp(); 
     return;
    }
  }
});

this.on('sensor:bottom', function(contact){
  bottom = !bottom;
  if(contact){
    if(right && bottom){
      phase1 = false;
      phase2 = true;
    }
    if(phase3){
     disableAll();
     goRight();
     return; 
    }
    if(phase2){
      disableAll();
      goLeft();
      return;
    }
    if(phase1){
      disableAll();
      goRight();
      return;
    }
  }else{
    if(phase3){
      disableAll();
      goDown();
      return;
    } 
  }
});

this.on('radar:hit', function(angle, distance) {
    
});

this.on('radar:miss', function(angle, distance) {
	
});

function fire_radar(vngle){
  context.radar.angle(vngle);
  context.radar.ping();
}

function goUp(){
  context.thrusters.bottom(true);
}

function goDown(){
  context.thrusters.top(true);
}

function goLeft(){
  context.thrusters.right(true);
}

function goRight(){
  context.thrusters.left(true);
}

function disableAll(){
  context.thrusters.left(false); 
  context.thrusters.right(false); 
  context.thrusters.top(false); 
  context.thrusters.bottom(false); 
}