// Orquestador de todo lo que pase en mi juego

class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = CANVAS_W
    this.canvas.height = CANVAS_H

    this.ctx = this.canvas.getContext('2d')

    this.fps = FPS
    this.drawIntervalId = null


    this.mario = new Mario(this.ctx, 20, 20)
    this.mario.groundTo(this.canvas.height - BG_FLOOR)

    this.bg = new Background(this.ctx)

    this.coins = []
    this.coinsTimeoutId = null

    this.enemies = []
    this.enemiesTimeoutId = null

    this.score = 0
    this.hearts = 3
  }

  start() {
    if (this.drawIntervalId === null) {
      // Esto se hace una vez
      this.setupListeners()
      // Esto 60 veces por segundo
      this.drawIntervalId = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
        this.generateElements()
        this.checkCollisions()
      }, this.fps)
    }
  }

  draw() {
    this.bg.draw()
    this.mario.draw()
    this.coins.forEach(coin => coin.draw())
    this.enemies.forEach(enemy => enemy.draw())
    this.drawScore()
  }

  move() {
    this.bg.move()
    this.mario.move()
    this.coins.forEach(coin => coin.move())
    this.enemies.forEach(enemy => enemy.move())

    this.checkBounds()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  stop() {
    clearInterval(this.drawIntervalId)
    this.drawIntervalId = null
  }

  setupListeners() {
    addEventListener('keydown', (event) => {
      this.mario.onKeyEvent(event)
    })
    addEventListener('keyup', (event) => {
      this.mario.onKeyEvent(event)
    })
  }

  generateElements() {
    if (this.coinsTimeoutId === null) {
      this.coinsTimeoutId = setTimeout(() => {
        const randomY = Math.floor(Math.random() * 101)

        this.coins.push(
          new Coin(
            this.ctx, this.canvas.width + 100,
            this.canvas.height - BG_FLOOR - COIN_H - randomY),
        )
        this.coinsTimeoutId = null
      }, 3000);
    }

    if (this.enemiesTimeoutId === null) {
      this.enemiesTimeoutId = setTimeout(() => {
        this.enemies.push(
          new Enemy(
            this.ctx,
            this.canvas.width,
            this.canvas.height - BG_FLOOR - BOWSER_H,
            BOWSER_W,
            BOWSER_H,
            BOWSER_SPRITE,
            BOWSER_SPRITE_VFRAMES,
            BOWSER_SPRITE_HFRAMES,
            BOWSER_SCORE
          )
        )
        this.enemiesTimeoutId = null
      }, 4000);
    }
  }

  checkBounds() {
    this.coins = this.coins.filter(coin => coin.x + coin.w >= 0)
  }

  checkCollisions() {
    this.coins = this.coins.filter(coin => {
      if (this.mario.collidesWith(coin)) {
        this.score += coin.score
        return false
      }
      return true
    })
  }

  drawScore() {
    this.ctx.font = "32px sans-serif";
    this.ctx.fillText(`Score: ${this.score}`, this.canvas.width - 200, 50);
  }
}