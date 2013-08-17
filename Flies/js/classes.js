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
