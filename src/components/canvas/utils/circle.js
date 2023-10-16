import { ctx } from "../Canvas";

export default class Circle {
  constructor(posX, posY, radius, valX, valY, fillColor, strokeColor) {
    this.posX = posX;
    this.posY = posY;
    this.radius = radius;
    this.valX = valX;
    this.valY = valY;
    this.minValX = valX;
    this.minValY = valY;
    this.maxValX = 1;
    this.maxValY = 1;
    this.fillColor =
      fillColor ||
      `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
    this.strokeColor = strokeColor || "white";
    this.isInside = false;
  }

  update() {
    if (
      this.posX >= window.innerWidth + this.radius + 20 ||
      this.posX <= -this.radius - 20
    ) {
      this.valX = -this.valX;
    }

    if (
      this.posY >= window.innerHeight + this.radius + 20 ||
      this.posY <= -this.radius - 20
    ) {
      this.valY = -this.valY;
    }

    this.posX += this.valX;
    this.posY += this.valY;

    this.draw();
  }

  draw() {
    ctx.current.beginPath();
    ctx.current.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    ctx.current.fillStyle = this.fillColor;
    ctx.current.strokeStyle = this.strokeColor;
    ctx.current.fill();
  }

  setFillColor(color) {
    this.fillColor = color;
  }
}
