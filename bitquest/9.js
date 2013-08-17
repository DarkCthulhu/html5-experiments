/*
 * Open all three doors to exit.
 *
 * The answer is 5.
 */
 
var init = false;

this.on('start', function(){
    this.thrusters.bottom(true);
});

this.on('sensor:top', function(contact){
	if(!init){
      if(contact){
          this.thrusters.bottom(false);
          this.thrusters.left(true);
      }else{
          this.thrusters.left(false);
          this.thrusters.bottom(true);
          fire_radar(this,270);
      }
    }
    else{
      	this.thrusters.bottom(false);
        this.thrusters.right(true);
      	this.thrusters.left(false);
        fire_radar(this, 180);
      }
});

this.on('sensor:right', function(contact){
	this.thrusters.right(true);
    this.thrusters.left(false);
    init = true;
    this.thrusters.bottom(true);
});



this.on('sensor:left', function(contact){
	this.thrusters.right(false);
    this.thrusters.left(true);
});


this.on('radar:hit', function(angle, distance) {
    if(angle == 270){
    	if(distance < 180){
        	this.thrusters.left(true);
            this.thrusters.bottom(false);
        }else
        fire_radar(this,270);
    }else if(angle == 180){
    	if(distance < 290){
        	this.thrusters.right(false);
            this.thrusters.top(true);
        }
        fire_radar(this,180);
    }
});


this.on('radar:miss', function(angle, distance) {
	
});

function fire_radar(that, vngle){
	that.radar.angle(vngle);
    that.radar.ping();
}