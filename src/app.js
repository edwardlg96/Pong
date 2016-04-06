
var HelloWorldLayer = cc.Layer.extend({
    jug1:null,    
    jug2:null,    
    ball:null,    
    points1:null,
    points2:null,
    score1:0,
    score2:0,
    moveX:0,
    moveY:0,
    speedBall:0,
    
    initializer:function(){
        var size = cc.winSize;
        var color = cc.color(100,100,100);
        var white = cc.color(255,255,255);
        this.moveX = this.random(1,3);
        this.moveY = this.random(1,3);
        this.speedBall = this.random(0.0001,0.001);
        
        this.jug1 = new cc.Sprite(res.vegeta);
        this.jug1.setScale(0.35,0.35);
        this.jug1.setPosition(size.width * 0.1,size.height / 2);
        this.addChild(this.jug1, 1);

        this.jug2 = new cc.Sprite(res.goku);
        this.jug2.setScale(0.2,0.2);
        this.jug2.setPosition(size.width -(size.width * 0.1),size.height / 2);
        this.addChild(this.jug2, 1);        

        var lineaDivisoria =  new cc.DrawNode();
        lineaDivisoria.drawSegment(cc.p(size.width/2,0),cc.p(size.width/2,size.height),3,color);
        this.addChild(lineaDivisoria,0);
        
        this.ball = new cc.Sprite(res.genki);
        this.ball.setScale(0.2,0.2);
        this.ball.setPosition(size.width / 2, this.random(15, size.height - 80));
        //this.ball.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.ball, 1);

        this.points1 = new cc.LabelTTF("0","Arial",24);
        this.points1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
        this.addChild(this.points1,0);
        
        this.points2 = new cc.LabelTTF("0","Arial",24);
        this.points2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
        this.addChild(this.points2,0);
    },
    
    
    moveControls: function(keyCode, event){
        
        var target = event.getCurrentTarget();
        var size = cc.winSize;
            
        // Botton W
        if(keyCode == cc.KEY.w){
            if(target.jug1.getPositionY() + 40 < size.height - 80)
                target.jug1.setPosition(target.jug1.getPositionX(), target.jug1.getPositionY() + 40);
        }
        
        // Botton S
        if(keyCode == cc.KEY.s){
            if(target.jug1.getPositionY() - 40 > size.height/2 - size.height/2 + 40)
                target.jug1.setPosition(target.jug1.getPositionX(), target.jug1.getPositionY() - 40);
        }
        
        // Botton Up
        if(keyCode == cc.KEY.up){
            if(target.jug2.getPositionY() + 40 < size.height - 80)
                target.jug2.setPosition(target.jug2.getPositionX(), target.jug2.getPositionY() + 40);
        }
        
        // Botton down
        if(keyCode == cc.KEY.down){
            if(target.jug2.getPositionY() - 40 > size.height/2 - size.height/2 +40)
                target.jug2.setPosition(target.jug2.getPositionX(), target.jug2.getPositionY() - 40);
        }
    },
    
    random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    
    resetBall:function(){
        var size = cc.winSize;
        this.speedBall = this.random(0.0001,0.001);
        this.ball.setPosition(size.width / 2, this.random(0, size.height - 80));
        this.moveX = this.random(1,3);
        this.moveY = this.random(1,3);
        this.points1.setString(this.score1);
        this.points2.setString(this.score2);
    },
    
    // Method to moves the ball
    moveBall: function(){
        
        var position = this.ball.getPosition();
        
        if(position.y <= 20 || position.y >= cc.winSize.height - 40){
            this.moveY *= -1;
            
        } else if(position.x <= 0 ){
            this.score2++;
            this.resetBall();
        } else if(position.x >= cc.winSize.width){
            this.score1++;
            this.resetBall();
        } else if (cc.rectIntersectsRect(this.ball.getBoundingBox(), this.jug1.getBoundingBox())){
            cc.log("collision");
            this.moveX *= -1.2;
        }
        
        else if(cc.rectIntersectsRect(this.ball.getBoundingBox(), this.jug2.getBoundingBox())){
            cc.log("collision");
            this.moveX *= -1.2;       
        }
        
        var newX = this.ball.getPosition().x + this.moveX;
        var newY = this.ball.getPosition().y + this.moveY;
        
        this.ball.setPosition(newX, newY);
        
    },
    
    collisions: function(){
        
        
    },
    
    ctor:function () {
        this._super();
        this.initializer();
        
        // Schedule Moveball
        this.schedule(this.moveBall, this.speedBall);
        
        //Inicializando eventos
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:  this.moveControls
		}, this);
        
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

