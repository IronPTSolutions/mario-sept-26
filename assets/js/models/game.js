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
    this.coinTimeoutId = null

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
      }, this.fps)
    }
  }

  draw() {
    this.bg.draw()
    this.mario.draw()
    this.coins.forEach(coin => coin.draw())
  }

  move() {
    this.bg.move()
    this.mario.move()
    this.coins.forEach(coin => coin.move())

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
    if (this.coinTimeoutId === null) {
      this.coinTimeoutId = setTimeout(() => {
        const randomY = Math.floor(Math.random() * 101)

        this.coins.push(
          new Coin(
            this.ctx, this.canvas.width + 100,
            this.canvas.height - BG_FLOOR - COIN_H - randomY),
        )
        this.coinTimeoutId = null
      }, 3000);
    }
  }

  checkBounds() {
    this.coins = this.coins.filter(coin => coin.x + coin.w >= 0)
  }
}