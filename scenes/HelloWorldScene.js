// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("hello-world");
  }

  create(){
    //crear la paleta rectangular
    this.paddle = this.add.rectangle(400, 500, 100, 20,0x6666ff);

    //crear la pelota
    this.ball = this.add.circle(310, 300, 10, 0xff6666);

    //agregar obstaculo
    this.obstacle = this.add.rectangle(400, 250, 100, 50, 0x66ff66);

    //agregar fisicas a los objetos
    this.physics.add.existing(this.paddle);
    this.physics.add.existing(this.ball);
    this.physics.add.existing(this.obstacle);

    //FISICAS DE LA PALETA
    //hacer la paleta inamovible
    this.paddle.body.setImmovable(true);
    //agregar choque de la paleta con los limites de la pantalla
    this.paddle.body.setCollideWorldBounds(true);
    //hacer que la paleta no se vea afectada por la gravedad
    this.paddle.body.setAllowGravity(false);

    //agregar cursor
     // Agregar el puntero del mouse
     this.mousePointer = this.input.activePointer;

    //FISICAS DE LA PELOTA
    //colision con los limites
    this.ball.body.setCollideWorldBounds(true);
    //rebote de la pelota
    this.ball.body.setBounce(1, 1);
    //velocidad de la pelota
    this.ball.body.setVelocity(200, 200);

    //FISICAS DE LOS OBSTACULOS
    //hacer al obstaculo inamovible
    this.obstacle.body.setImmovable(true);
    //hacer que el obstaculo no se vea afectado por la gravedad
    this.obstacle.body.setAllowGravity(false);

    //COLISIONES
    //colision de la pelota con la paleta
    this.physics.add.collider(this.paddle, this.ball, null, null, this);

    //colision de la pelota con el obstaculo
    this.ball.body.onWorldBounds = true;
    this.physics.add.collider(
      this.obstacle,
      this.ball,
      this.handleCollision,
      null,
      this
    );
     //colision de la pelota con el limite inferior
     this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      if (down) {
        console.log("hit bottom");
        this.scene.start("GameOver");
      }
    });
  }

  update(){
   // Mueve la paleta con el cursor del mouse
   this.paddle.x = this.mousePointer.x;
  }
  handleCollision = (obstacle, ball) => {
    console.log("collision");
    obstacle.destroy();
  };
}

