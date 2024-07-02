// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");

class Player {
  constructor(canvas) {
    this.width = 70;
    this.height = 70;
    this.x = 10;
    this.y = canvas.height / 2 - this.height / 2;
    this.speed = 15;
    this.image = new Image();
    this.image.src = "../assets/player2.png";
    this.throwImage = new Image();
    this.throwImage.src = "../assets/player-throwing.png";
    this.currentImage = this.image;
    this.opacity = 1;
    this.lives = 3;

    this.image.onload = () => {
      this.ready = true;
    };
    this.throwImage.onload = () => {
      this.throwReady = true;
    };
  }

  draw(ctx) {
    if (this.ready && this.throwReady) {
      ctx.globalAlpha = this.opacity;
      return ctx.drawImage(
        this.currentImage,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  move(direction) {
    const topBoundary = 80
    if (direction === "up" && this.y > topBoundary) {
      this.y -= this.speed;
    } else if (direction === "down" && this.y + this.height < canvas.height) {
      this.y += this.speed;
    }
  }

  throw() {
    this.currentImage = this.throwImage;
    const pokeball = new Pokeball(
      this.x + this.width,
      this.y + this.height / 2 - 10
    );
    setTimeout(() => {
      this.currentImage = this.image;
    }, 200);
    return pokeball;
  }

  loseLife() {
    this.lives -= 1;
  }

  gainLife() {
    this.lives += 1;
  }
}

console.log("Player class loaded");
