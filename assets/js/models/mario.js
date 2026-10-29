class Mario {
  constructor(ctx, x, y) {
    this.ctx = ctx

    this.x = x
    this.y = y
    this.ground = 0

    this.w = 30
    this.h = 30

    this.vx = 0
    this.vy = 0
    this.ay = 0

    this.isJumping = false
  }

  groundTo(groundY) {
    this.y = groundY - this.h
    this.ground = groundY
  }

  draw() {
    this.ctx.fillRect(this.x, this.y, this.w, this.h)
  }

  move() {
    this.vy += this.ay

    this.x += this.vx
    this.y += this.vy

    if (this.y + this.h > this.ground) {
      this.groundTo(this.ground)

      this.vy = 0
      this.ay = 0

      this.isJumping = false
    }
  }

  onKeyEvent(event) {
    const isPressed = event.type === 'keydown'

    switch (event.keyCode) {
      case KEY_RIGHT:
        if (isPressed) {
          this.vx = MARIO_VX
        } else {
          this.vx = 0
        }
        break
      case KEY_LEFT:
        if (isPressed) {
          this.vx = -MARIO_VX
        } else {
          this.vx = 0
        }
        break
      case KEY_UP:
        if (!this.isJumping) {
          this.isJumping = true
          this.vy = -MARIO_VY
          this.ay = MARIO_AY
        }
        break;
    }
  }
}