class Mario {
  constructor(ctx, x, y) {
    this.ctx = ctx

    this.x = x
    this.y = y
    this.ground = 0

    this.w = MARIO_W
    this.h = MARIO_H

    this.vx = 0
    this.vy = 0
    this.ay = 0

    this.isJumping = false

    // Declarar para las 2 imagenes

    this.spriteRight = new Image()
    this.spriteRight.src = '/assets/img/sprites/mario/sprite-right-mario.png'
    this.spriteRight.vFrames = 2 // Cuantas columnas tiene el dibujo xFrames
    this.spriteRight.hFrames = 2 // Cuantas filas
    this.spriteRight.vFrameIndex = 0
    this.spriteRight.hFrameIndex = 1
    this.spriteRight.onload = () => {
      this.spriteRight.isReady = true

      this.spriteRight.frameW = Math.floor(this.spriteRight.width / this.spriteRight.vFrames)
      this.spriteRight.frameH = Math.floor(this.spriteRight.height / this.spriteRight.hFrames)
    }

    this.spriteLeft = new Image()
    this.spriteLeft.src = '/assets/img/sprites/mario/sprite-left-mario.png'
    this.spriteLeft.vFrames = 2 // Cuantas columnas tiene el dibujo xFrames
    this.spriteLeft.hFrames = 2 // Cuantas filas
    this.spriteLeft.vFrameIndex = 0
    this.spriteLeft.hFrameIndex = 1
    this.spriteLeft.onload = () => {
      this.spriteLeft.isReady = true

      this.spriteLeft.frameW = Math.floor(this.spriteLeft.width / this.spriteLeft.vFrames)
      this.spriteLeft.frameH = Math.floor(this.spriteLeft.height / this.spriteLeft.hFrames)
    }

    this.sprite = this.spriteRight

    this.drawCount = 0
  }

  groundTo(groundY) {
    this.y = groundY - this.h
    this.ground = groundY
  }

  draw() {
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.vFrameIndex * this.sprite.frameW,
        this.sprite.hFrameIndex * this.sprite.frameH,
        this.sprite.frameW,
        this.sprite.frameH,
        this.x,
        this.y,
        this.w,
        this.h
      )
    }

    this.animate()
    this.drawCount++
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

    if (this.x < 0) {
      this.x = 0
    }

    if (this.x + this.w > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w
    }
  }

  onKeyEvent(event) {
    const isPressed = event.type === 'keydown'

    switch (event.keyCode) {
      case KEY_RIGHT:
        if (isPressed) {
          this.sprite = this.spriteRight
          this.vx = MARIO_VX
        } else {
          this.vx = 0
        }
        break
      case KEY_LEFT:
        if (isPressed) {
          this.sprite = this.spriteLeft
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

  animate() {
    if (this.isJumping) {
      this.sprite.vFrameIndex = 0
      this.sprite.hFrameIndex = 0
    } else if (this.vx !== 0) {
      this.animateFrame(1, 1, 2, 5)
    } else {
      this.sprite.vFrameIndex = 0
      this.sprite.hFrameIndex = 1
    }
  }

  animateFrame(initialVFrame, initialHFrame, frames, frequency) {
    if (this.sprite.hFrameIndex !== initialHFrame) { // Comprueba si vengo de otra animacion, por ejemplo de jumping que la hIndex seria 0
      this.sprite.vFrameIndex = initialVFrame
      this.sprite.hFrameIndex = initialHFrame
    } else if (this.drawCount % frequency === 0) {
      this.drawCount = 0
      this.sprite.vFrameIndex = (this.sprite.vFrameIndex + 1) % frames
    }
  }

  collidesWith(element) {
    return (this.x + this.w > element.x) &&
      (this.x < element.x + element.w) &&
      (this.y + this.h > element.y) &&
      (this.y < element.y + element.h)
  }
}