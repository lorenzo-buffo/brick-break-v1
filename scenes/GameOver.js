export default class GameOver extends Phaser.Scene {
    constructor() {
      super("GameOver");
      }
    

    create(){
      const width = this.scale.width;
      const height = this.scale.height;
      
      // Mostrar el mensaje de Game Over 
      this.add.text(width / 2, height / 2 - 100, "GAME OVER", {
        fontSize: "64px",
        fill: "#fff"
      }).setOrigin(0.5);
       }
    }

    
