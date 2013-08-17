/*
 * This other bot is helping-- somewhat.
 */

this.on('start', function(){
    this.thrusters.bottom(true);
    
});

this.on('sensor:top', function(contact){
	this.thrusters.left(true);
    this.thrusters.bottom(false);
    fire_radar(this, 0);
	
});

this.on('radar:hit', function(angle, distance) {
    if(distance < 5)
    	this.thrusters.left(false);
    else
    	this.thrusters.left(true);
    fire_radar(this, 0);
});

this.on('radar:miss', function(angle, distance) {
	this.thrusters.left(true);
    fire_radar(this, 0);
});

function fire_radar(that, vngle){
	that.radar.angle(vngle);
    that.radar.ping();
}