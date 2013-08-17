/*
 * Not only does your robot come equipped with sensors and thrusters. It also
 * has a radar that can be used to determine distances.
 *
 * The radar has two methods:
 *
 *
 *  - angle()       - the current direction the radar is pointing (0-359)
 *  - angle(number) - set the radar direction (0-359)
 *
 *  - ping()        - fires the radar
 *
 * One of two events will return after firing the radar:
 *  - 'radar:hit'   - an object was found
 *  - 'radar:miss'  - no object was found
 *
 * When a hit event is received, the handler will receive the angle the
 * ping was sent out on and the distance to the object, e.g.,
 *    this.on('radar:hit', function(angle, distance) {
 *       // do stuff
 *    });
 *
 *  Bonus info: 
 *
 *      Those red jumpy things will kill your robot. Don't touch them.
 */

var aaya = false;

 
this.on('start', function(){
    this.thrusters.left(true);
	fire_radar(this, 105);
});

this.on('radar:hit', function(angle, distance) {
    if(distance > 100){
    	this.thrusters.left(false);
    	this.thrusters.top(true);
        aaya = true
    }
    if (!aaya) fire_radar(this, 105);
    else fire_radar(this, 0);
});

this.on('radar:miss', function(angle, distance) {
	this.thrusters.top(false);
    this.thrusters.left(true);
});

function fire_radar(that, vngle){
	that.radar.angle(vngle)
    that.radar.ping();

}