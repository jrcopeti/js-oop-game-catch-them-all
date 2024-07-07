class Game {
  constructor() {
    this.player = new Player(canvas);
    this.pokeballArr = [];
    this.pokemonArr = [];
    this.pokemonData = pokemonData;
    this.specialPokemonData = specialPokemonData;
    this.score = 0;
    this.scorePopups = [];
    this.lifeScoreBonus = 3000;
    this.masterballScoreBonus = 5000;
    this.heart = document.createElement("img");
    this.heart.src = "../assets/heart.png";
    this.masterball = document.createElement("img");
    this.masterball.src = "../assets/masterball.png";
    this.currentLevel = 0;
    this.background = document.createElement("img");
    this.background.src = levels[this.currentLevel].background;
    this.pokemonCount = 0;
    this.interval = null;
    this.specialInterval = null;
    this.pause = false;
    this.gameOver = false;
    this.currentMusic = null;
    this.controls();
    this.showPokemon();
    this.showSpecialPokemon();
    this.playMusic();
  }

  start() {
    interScreen.style.display = "none";
    startScreen.style.display = "none";
    canvas.style.display = "block";
  }

  update() {
    if (this.pause || this.gameOver) {
      return;
    }

    if (this.player.lives <= 0) {
      gameOverAudio.play();
      this.endGame();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);

    this.player.draw(ctx);
    this.updatePokeballs();
    this.updatePokemon();
    this.checkCollision();
    this.checkPlayerCollision();

    this.displayScore();
    this.displayLives();
    this.displayLevel();
    this.displayCount();
    this.displayMasterball();
    this.drawScorePopups();
    this.updateScorePopups();
    this.lifeBonus();
    this.masterballBonus();
    this.levelUp();
  }

  controls() {
    window.addEventListener("keydown", (e) => this.handleKeydown(e));
  }

  handleKeydown(e) {
    const key = e.key;
    const possibleKeys = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      " ",
      "m",
      "Enter",
    ];
    if (possibleKeys.includes(key)) {
      e.preventDefault();

      switch (key) {
        case "ArrowUp":
          if (this.pause) {
            return;
          }
          this.player.move("up");
          break;
        case "ArrowDown":
          if (this.pause) {
            return;
          }
          this.player.move("down");
          break;
        case "ArrowLeft":
          if (this.pause) {
            return;
          }
          this.player.move("left");
          break;
        case "ArrowRight":
          if (this.pause) {
            return;
          }
          this.player.move("right");
          break;
        case " ":
          if (this.pause) {
            return;
          }
          const pokeball = this.player.throw();
          this.pokeballArr.push(pokeball);
          break;
        case "m":
          if (this.pause) {
            return;
          }
          const used = this.player.useMasterball();
          if (used) {
            this.defeatAllPokemon();
          }
          break;
        case "Enter":
          this.pause = !this.pause;
          break;
      }
    }
  }

  updatePokeballs() {
    this.pokeballArr.forEach((pokeball, index) => {
      pokeball.move();
      pokeball.draw(ctx);

      if (pokeball.x > canvas.width) {
        this.pokeballArr.splice(index, 1);
      }
    });
  }

  updatePokemon() {
    this.pokemonArr.forEach((pokemon, index) => {
      pokemon.move();
      pokemon.draw(ctx);
      if (pokemon.x + pokemon.width < 0) {
        switch (pokemon.name) {
          case "Weezing":
          case "Arbok":
          case "Ekans":
          case "Koffing":
          case "Kadabra":
          case "Gengar":
          case "Gastly":

          case "Mewtwo":
          case "Lugia":
          case "Charizard":
          case "Mew":
          case "Ho-oh":
          case "Venosaur":
          case "Jynx":
          case "Blastoise":
          case "Dragonite":
          case "Celebi":
          case "Entei":
            break;
          default:
            this.player.loseLife();
            this.player.hit();
        }
        pokemon.state = "remove";
        this.pokemonArr.filter((pokemon) => pokemon.state === "active");
      }
    });
  }

  showPokemon() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      if (this.pause) {
        return;
      }

      const randomPokemon = this.getRandomPokemon();
      const pokemon = new Pokemon(
        canvas,
        randomPokemon.imageSrc,
        randomPokemon.score,
        randomPokemon.name
      );
      pokemon.speed = levels[this.currentLevel].speed;
      this.pokemonArr.push(pokemon);
    }, levels[this.currentLevel].rate);
  }

  showSpecialPokemon() {
    if (this.specialInterval) {
      clearInterval(this.specialInterval);
    }
    this.specialInterval = setInterval(() => {
      if (this.pause) {
        return;
      }
      const randomSpecialPokemon = this.getRandomPokemon(true);
      const specialPokemon = new Pokemon(
        canvas,
        randomSpecialPokemon.imageSrc,
        randomSpecialPokemon.score,
        randomSpecialPokemon.name
      );
      specialPokemon.speed = levels[this.currentLevel].specialSpeed;
      this.pokemonArr.push(specialPokemon);
    }, levels[this.currentLevel].specialRate);
  }

  getRandomPokemon(special = false) {
    if (special) {
      const randomIndex = Math.floor(
        Math.random() * this.specialPokemonData.length
      );
      return this.specialPokemonData[randomIndex];
    }
    const randomIndex = Math.floor(Math.random() * this.pokemonData.length);
    return this.pokemonData[randomIndex];
  }

  checkCollision() {
    this.pokeballArr.forEach((pokeball, pokeballIndex) => {
      this.pokemonArr.forEach((pokemon, pokemonIndex) => {
        if (
          pokeball.x < pokemon.x + pokemon.width &&
          pokeball.x + pokeball.width > pokemon.x &&
          pokeball.y < pokemon.y + pokemon.height &&
          pokeball.y + pokeball.height > pokemon.y
        ) {
          console.log("caught", pokemon.name, "score:", pokemon.score);

          pokemon.captured();

          this.useScorePopup(pokemon);

          this.pokeballArr.splice(pokeballIndex, 1);

          switch (pokemon.name) {
            case "Weezing":
            case "Arbok":
              enemyAudio.play();
              this.player.masterballs > 0 ? this.player.loseMasterball() : null;
              this.pokemonCount > 0
                ? (this.pokemonCount -= 1)
                : (this.pokemonCount = 0);
              this.score - pokemon.score >= 0
                ? (this.score -= pokemon.score)
                : (this.score = 0);
              this.flashScreen();
              break;

            case "Ekans":
            case "Koffing":
            case "Kadabra":
              enemyAudio.play();
              this.pokemonCount > 0
                ? (this.pokemonCount -= 1)
                : (this.pokemonCount = 0);
              this.score - pokemon.score >= 0
                ? (this.score -= pokemon.score)
                : (this.score = 0);
              this.flashScreen();
              break;

            case "Gengar":
            case "Gastly":
              enemyAudio.play();
              this.pokemonCount > 0
                ? (this.pokemonCount -= 1)
                : (this.pokemonCount = 0);
              this.score - pokemon.score >= 0
                ? (this.score -= pokemon.score)
                : (this.score = 0);
              this.player.loseLife();
              this.player.hit();
              break;

            case "Mewtwo":
            case "Lugia":
            case "Charizard":
              this.player.gainMasterball();
              this.score += pokemon.score;
              break;

            case "Mew":
            case "Ho-oh":
            case "Venosaur":
              this.player.gainLife();
              this.score += pokemon.score;
              break;

            case "Jynx":
            case "Blastoise":
              useMasterballAudio.volume = sfxVol;
              useMasterballAudio.play();
              this.defeatAllPokemon();
              this.score += pokemon.score;

            default:
              this.score += pokemon.score;
              captureAudio.play();
              this.pokemonCount += 1;
              break;
          }
        }
      });
    });
    this.pokemonArr = this.pokemonArr.filter(
      (pokemon) => pokemon.state === "active"
    );
  }

  checkPlayerCollision() {
    this.pokemonArr.forEach((pokemon, index) => {
      if (
        pokemon.x < this.player.x + this.player.width &&
        pokemon.x + pokemon.width > this.player.x &&
        pokemon.y < this.player.y + this.player.height &&
        pokemon.y + pokemon.height > this.player.y
      ) {
        this.player.hit();
        this.player.loseLife();
        this.pokemonArr.splice(index, 1);
      }
    });
  }

  defeatAllPokemon() {
    this.pokemonArr.forEach((pokemon) => {
      pokemon.image.src = "../assets/capture.png";
      pokemon.speed = 0;
      this.flashScreen();
      this.useScorePopup(pokemon, true);
      switch (pokemon.name) {
        case "Weezing":
        case "Arbok":
        case "Ekans":
        case "Koffing":
        case "Kadabra":
        case "Gengar":
        case "Gastly":
          break;

        case "Mewtwo":
        case "Lugia":
        case "Charizard":
          // this.player.gainMasterball();
          break;

        case "Mew":
        case "Ho-oh":
        case "Venosaur":
          // this.player.gainLife();
          break;

        default:
          captureAudio.play();
          this.pokemonCount += 1;
          break;
      }
      console.log("Caught all pokémon", pokemon.name);

      setTimeout(() => {
        this.pokemonArr = [];
      }, 100);
    });
  }

  flashScreen() {
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  levelUp() {
    if (
      this.currentLevel < levels.length - 1 &&
      this.pokemonCount >= levels[this.currentLevel].maxCount
    ) {
      this.flashScreen();
      this.currentLevel++;
      this.background.src = levels[this.currentLevel].background;
      this.pokemonCount = 0;
      this.pokemonArr = [];
      levelUpAudio.play();
      this.showPokemon();
      this.showSpecialPokemon();
      this.playMusic();
    } else if (
      this.currentLevel === levels.length - 1 &&
      this.pokemonCount >= levels[this.currentLevel].maxCount
    ) {
      this.flashScreen();
      this.finalGame();
    }
  }

  lifeBonus() {
    if (this.score >= this.lifeScoreBonus) {
      this.player.gainLife();
      this.lifeScoreBonus += 3000;
    }
  }

  masterballBonus() {
    if (this.score >= this.masterballScoreBonus) {
      this.player.gainMasterball();
      this.masterballScoreBonus += 5000;
    }
  }

  createScorePopup(x, y, score, color, image = null) {
    if (image) {
      const scorePopup = new ScorePopup(x, y, score, color, image);
      this.scorePopups.push(scorePopup);
    } else {
      const scorePopup = new ScorePopup(x, y, score, color);
      this.scorePopups.push(scorePopup);
    }
  }

  useScorePopup(pokemon, masterball = false) {
    let color;
    let score;
    let image = null;

    if (!masterball) {
      switch (pokemon.name) {
        case "Weezing":
        case "Arbok":
          color = "217, 30, 24";
          score = -pokemon.score;
          image = "../assets/masterball.png";
          break;
        case "Ekans":
        case "Koffing":
        case "Kadabra":
          color = "217, 30, 24";
          score = -pokemon.score;
          break;
        case "Gengar":
        case "Gastly":
          color = "217, 30, 24";
          score = -pokemon.score;
          image = "../assets/heart.png";
          break;
        case "Mewtwo":
        case "Lugia":
        case "Charizard":
          color = "4, 147, 114";
          score = pokemon.score;
          image = "../assets/masterball.png";
          break;
        case "Mew":
        case "Ho-oh":
        case "Venosaur":
          color = "4, 147, 114";
          score = pokemon.score;
          image = "../assets/heart.png";
          break;
        default:
          color = "4, 147, 114";
          score = pokemon.score;
          break;
      }
      this.createScorePopup(
        pokemon.x + pokemon.width / 2,
        pokemon.y,
        score,
        color,
        image
      );
    }
  }

  drawScorePopups() {
    this.scorePopups.forEach((popup) => popup.draw(ctx));
  }

  updateScorePopups() {
    this.scorePopups = this.scorePopups.filter((popup) => !popup.isExpired());
  }

  displayScore() {
    const text = `Score: ${this.score}`;
    // const textWidth = ctx.measureText(text).width;
    // const padding = 20;
    const fixedText = 200;
    ctx.font = "bold 25px Arial";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(5, 6, fixedText, 32);
    ctx.fillStyle = "white";
    ctx.fillText(text, 10, 30);
  }

  displayLevel() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(685, 6, 110, 32);
    ctx.font = "bold 25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Level: ${levels[this.currentLevel].level}`, 695, 30);
  }

  displayLives() {
    const heartWidth = 20;
    const heartHeight = 20;
    for (let i = 0; i < this.player.lives; i++) {
      ctx.drawImage(
        this.heart,
        10 + i * (heartWidth + 5),
        40,
        heartWidth,
        heartHeight
      );
    }
  }

  displayMasterball() {
    const masterballWidth = 20;
    const masterballHeight = 20;
    for (let i = 0; i < this.player.masterballs; i++) {
      ctx.drawImage(
        this.masterball,
        10 + i * (masterballWidth + 5),
        65,
        masterballWidth,
        masterballHeight
      );
    }
  }

  displayCount() {
    const text = `Catch: ${this.pokemonCount} / ${
      levels[this.currentLevel].maxCount
    }`;
    const textWidth = ctx.measureText(text).width;
    const pr = 20;
    const canvasWidth = ctx.canvas.width;
    const xPosition = canvasWidth - textWidth - pr;

    ctx.font = "bold 25px Arial";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(xPosition - 10, 40, textWidth + 30, 35);
    ctx.fillStyle = "white";
    ctx.fillText(text, xPosition, 65);
  }

  playMusic() {
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
    }

    if (levels[this.currentLevel].music) {
      this.currentMusic = levels[this.currentLevel].music;
      this.currentMusic.volume = musicVol;
      this.currentMusic.loop = true;
      this.currentMusic.play();
    }
  }

  endGame() {
    this.gameOver = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(this.interval);
    clearInterval(this.specialInterval);
    canvas.style.display = "none";
    endScreen.style.display = "block";
    scoreDisplay.innerText = `Your Score: ${this.score}`;
  }

  finalGame() {
    this.gameOver = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(this.interval);
    clearInterval(this.specialInterval);
    canvas.style.display = "none";
    finalScreen.style.display = "block";
    finalScoreDisplay.innerText = `Your Score: ${this.score}`;
  }
}
