let prizes_config = {
    count:12,
    prize_names :["3000 credits","35% Off","Hard Luck!",'70% OFF',"Swagpack","100% OFF","Netflix","50% OFF","Amazon Voucher","2 Extra spin","CB Tshirt","CB Book"]
}

let config = {
    type: Phaser.CANVAS,
    width : 800,
    height : 600,
    //backgroundColor : 0xffcc00,
    
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
};

let game = new Phaser.Game(config);

function preload(){
    console.log("Preload");
    this.load.image('background','../Assets/back.png');
    console.log(this);
    this.load.image('wheel','../Assets/wheel.png');
    this.load.image('pin','../Assets/pin.png');
    this.load.image('stand','../Assets/stand.png');
}

function create(){
    console.log("Create");
    let W = game.config.width;
    let H = game.config.height;
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    
    let stand = this.add.sprite(W/2,H/2 + 250,'stand');
    stand.setScale(0.25);
    
    let pin = this.add.sprite(W/2,H/2 - 250,'pin');
    pin.setScale(0.25);
    pin.depth = 1;
    
    this.wheel  = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.25);
    //event listener for mouse click
    this.input.on("pointerdown",spinwheel,this);
    
    //create text object
    font_style = {
        font : "bold 30px Roboto",
        align : "center",
        color : "blue",
    }
    this.game_text = this.add.text(10,10,"Welcome to spin and win",font_style);
}

function update(){
    console.log("Update");
    //this.wheel.angle += 2;
}

function spinwheel(){
    //console.log("You clicked the mouse");
    console.log("Start spinning");
    //this.game_text.setText("You clicked the mouse!");
    let rounds = Phaser.Math.Between(2,5);
    let degrees = Phaser.Math.Between(0,11)*30;
    
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
    
    tween = this.tweens.add({
        targets : this.wheel,
        angle : total_angle ,
        ease : "Cubic.easeOut",
        duration : 3000,
        callbackScope:this,
        onComplete:function(){
            this.game_text.setText("You won " + prizes_config.prize_names[idx]);
        },
    });
}

