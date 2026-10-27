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
    this.mario.groundTo(this.canvas.height - 100)
  }

  start() {
    if (this.drawIntervalId === null) {
      this.setupListeners()
      this.drawIntervalId = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
      }, this.fps)
    }
  }

  draw() {
    this.mario.draw()
  }

  move() {
    this.mario.move()
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
}