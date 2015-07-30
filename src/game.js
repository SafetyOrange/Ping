var game = new Phaser.Game(800, 600, Phaser.AUTO, 'PING!', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('ball', 'bin/ball.png');
    game.load.image('paddle', 'bin/paddle.png');

}

var ball, paddle1, paddle2;
var ballVel = new PIXI.Point(500,20);
var paddleMoveSpeed = 10;
var paddleMat, ballMat;

function create() {

    //Initialize
    game.world.setBounds(-300, 0, game.width + 600, game.height);
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
    worldMat = game.physics.p2.createMaterial('worlddMat');
    ballMat = game.physics.p2.createMaterial('ballMat', ball.body);
    var paddleBallCollision = game.physics.p2.createContactMaterial(ballMat, paddleMat);
    var worldBallCollision = game.physics.p2.createContactMaterial(ballMat, worldMat);

    paddleBallCollision.restitution = 1;
    worldBallCollision.restitution = 1;

    paddle1.body.setMaterial(paddleMat);
    paddle2.body.setMaterial(paddleMat);

    //  4 trues = the 4 faces of the world in left, right, top, bottom order
    game.physics.p2.setWorldMaterial(worldMat, true, true, true, true);

    ////Freeze paddle body in place
    paddle1.body.static = true;
    paddle2.body.static = true;

    ////Basic pong ball
    ball.body.setZeroDamping();
    ball.body.fixedRotation = true;
    ball.body.velocity.x = ballVel.x;
    ball.body.velocity.y = ballVel.y;

}

function update() {

    handleInput();

}

function render() {

    game.debug.body(ball);
    game.debug.body(paddle1);
    game.debug.body(paddle2);

}

function handleInput(){

  //Left Side
  if (game.input.keyboard.isDown(Phaser.Keyboard.W) && game.input.keyboard.isDown(Phaser.Keyboard.S)) {
    //Do nothing. It's about that that finesse.
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    paddle1.body.y -= paddleMoveSpeed;
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
    paddle1.body.y += paddleMoveSpeed;
  }


  //Right Side
  if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    //Do nothing. It's about that that finesse.
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    paddle2.body.y -= paddleMoveSpeed;
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    paddle2.body.y += paddleMoveSpeed;
  }

}
