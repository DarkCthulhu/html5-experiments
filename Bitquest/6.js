/*
 * No explanation.
 */
 
 var left = false;
 var right = false;
 var top = false;
 var bottom = false;
 var onedone = false;
 
 
this.on('start', function(){
    this.thrusters.bottom(true);
});

this.on('sensor:bottom', function(contact){
    bottom = contact;
    if (onedone && bottom){
   		this.thrusters.top(false);
    	this.thrusters.left(true);
    }
});
this.on('sensor:top', function(contact){
    top = contact;
    if(onedone){
    	
    	return;
    }
    if(top)	this.thrusters.bottom(false);
    if(!right) this.thrusters.left(true);
});

this.on('sensor:left', function(contact){
	left = contact;
    if(left && onedone){
    	this.thrusters.bottom(false);
        this.thrusters.left(true);
        return;
    }
    if(left){
    	this.thrusters.top(false);
        this.thrusters.left(true);
        onedone = true;
    }
});
this.on('sensor:right', function(contact){
	right = contact;
    if(right){
    	if(!bottom){
    		this.thrusters.left(false);
        	this.thrusters.top(true);
        }else{
			this.thrusters.left(false);
            this.thrusters.bottom(true);
        }
    }
});