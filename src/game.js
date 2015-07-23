var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'PING!', { preload: preload, create: create, update: update, render: render });
var ballVel = new PIXI.Point(500,0);
var paddleMat, ballMat;


function preload() {

    game.load.image('ball', 'bin/ball.png');
    game.load.image('paddle', 'bin/paddle.png');

}

var ball;
var paddle;

function create() {

    //Initialize
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.stage.backgroundColor = '#000000';

    //Instantiate
    ball = game.add.sprite(50, game.height/2, 'ball');
    paddle1 = game.add.sprite(25, game.height/2, 'paddle');
    paddle2 = game.add.sprite(game.width - 25, game.height/2, 'paddle');

    //Rescale
    ball.scale = new PIXI.Point(.3,.3);
    paddle1.scale = new PIXI.Point(.5,.5);
    paddle2.scale = new PIXI.Point(.5,.5);

    //Set Physics
    game.physics.enable([ball,paddle1, paddle2], Phaser.Physics.P2JS);

    ////Material & Basic Collision
    paddleMat = game.physics.p2.createMaterial('paddleMat');
    ballMat = game.physics.p2.createMaterial('ballMat', ball.body);
    var paddleBallCollision = game.physics.p2.createContactMaterial(ballMat, paddleMat);
    paddleBallCollision.restitution = 1;

    paddle1.body.setMaterial(paddleMat);
    paddle2.body.setMaterial(paddleMat);

    ////Freeze paddle body in place
    paddle1.body.static = true;
    paddle1.body.allowGravity = false;
    paddle2.body.static = true;
    paddle2.body.allowGravity = false;

    ////Basic pong ball
    ball.body.setZeroDamping();
    ball.body.velocity.x = ballVel.x;
    ball.body.velocity.y = ballVel.y;

}

function update() {


}

function collisionHandler (obj1, obj2) {
    ball.body.velocity.x *= -1;

}

function render() {

    // game.debug.body(ball);
    // game.debug.body(paddle1);
    // game.debug.body(paddle2);

}
