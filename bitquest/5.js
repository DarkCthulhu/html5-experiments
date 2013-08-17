/*
 * No explanation.
 */
 
 var left = false;
 var right = false;
 var top = false;
 var bottom = false;
 
 
this.on('start', function(){
    this.thrusters.top(true);
});

this.on('sensor:bottom', function(contact){
    bottom = !bottom;
    if(contact){
        this.thrusters.top(false);
        if(!right)
        	this.thrusters.left(true);
    }
});

this.on('sensor:top', function(contact){
	top = !top;
    if(contact){
		this.thrusters.bottom(false);
        if(!left)
        	this.thrusters.right(true);
    }
});

this.on('sensor:left', function(contact){
	left = !left;
    if(contact){
		this.thrusters.right(false);
        if(!bottom)
        	this.thrusters.top(true);
        else
        	this.thrusters.left(true);
    }
});

this.on('sensor:right', function(contact){
	right = !right;
    if(contact){
		this.thrusters.left(false);
        if(!bottom)
        	this.thrusters.top(true);
        else
            this.thrusters.bottom(true);
    }
});