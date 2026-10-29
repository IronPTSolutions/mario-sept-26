class Background {
  constructor(ctx) {
    this.ctx = ctx

    this.x = 0
    this.y = 0
    this.w = this.ctx.canvas.width
    this.h = this.ctx.canvas.height

    this.image = new Image()
    this.image.src = '/assets/img/bgs/bg-game.png'
    this.image.onload = () => {
      this.image.isReady = true
    }
  }

  draw() {
    if (this.image.isReady) {
      this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
    }
  }

  move() {

  }
}