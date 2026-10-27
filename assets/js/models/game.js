// Orquestador de todo lo que pase en mi juego

class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = CANVAS_W
    this.canvas.height = CANVAS_H

    this.ctx = this.canvas.getContext('2d')

    this.fps = FPS
    this.drawIntervalId = null
  }

  start() {
    if (this.drawIntervalId === null) {
      this.drawIntervalId = setInterval(() => {
        console.log('interval')
      }, this.fps)
    }
  }

  stop() {
    clearInterval(this.drawIntervalId)
    this.drawIntervalId = null
  }
}