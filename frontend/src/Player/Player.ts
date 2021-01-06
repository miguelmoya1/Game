import { Image } from "../Image/Image";
import { ctx, canvas } from "../Content/Content";

export class Player {
  private life = 50;
  private x = 0;
  private y = 0;
  private width = 0;
  private height = 0;
  private speed = 8;
  private floor = 695;
  private firstJump = 0;
  private jumpSize = 20;
  private jumping = false;
  private fallingDown = false;
  private map: any = [];
  private image: HTMLImageElement;

  async init(url: string) {
    this.image = await Image.loadImage(url);
    // player.appendChild(this.image);
    this.height = this.image.height;
    this.width = this.image.width;
    return this;
  }

  isInit() {
    return !!this.image;
  }

  constructor({ ...args }: any) {
    this.life = args.life || 50;
    this.x = args.x || 0;
    this.y = args.y || 0;
    this.width = args.width || 0;
    this.height = args.height || 0;
    this.speed = args.speed || 8;
    this.floor = args.floor || 695;
    this.firstJump = args.firstJump || 0;
    this.jumpSize = args.jumpSize || 20;
    this.jumping = args.jumping || false;
    this.fallingDown = args.fallingDown || false;
    this.map = args.map || [];

    document.addEventListener("keydown", (e) => {
      let key: number = e.key as any;
      this.map[key] = true;
      this.move();
    });

    document.addEventListener("keyup", (e) => {
      if (e.key in this.map) {
        this.move();
        this.map[e.key as any] = false;
      }
    });
  }

  getImage() {
    return this.image;
  }

  draw() {
    if (this.jumping) {
      this.jump();
    } else if (!this.jumping && this.y <= this.floor) {
      this.falling();
    }
    ctx.clearRect(
      this.x - this.speed * 3,
      this.y - this.speed * 3,
      this.width + this.speed * 5,
      this.height + this.speed * 5
    );
    ctx.drawImage(this.image, this.x, this.y);
    this.setLife();
    return this;
  }

  private setLife() {
    // life.style.width = `${(this.life * 100) / 50}%`;
  }

  private jump() {
    if (this.firstJump - this.jumpSize * this.speed >= this.y) {
      this.jumping = false;
    }
    this.y -= this.speed;
  }

  private falling() {
    this.fallingDown = true;
    this.y += this.speed * 2;
    if (this.y >= this.floor) {
      this.fallingDown = false;
      this.y = this.floor;
    }
  }

  private jumpPress() {
    if (!this.jumping) {
      if (this.map["w"] || this.map[" "]) {
        this.jumping = true;
        this.firstJump = this.y;
        this.y -= this.speed;
      }
    }
  }

  private moveLeft() {
    if (this.map["a"] && this.x >= 0) {
      this.x -= this.speed;
    }
  }

  private moveRight() {
    if (this.map["d"] && this.x + this.width <= canvas.width) {
      this.x += this.speed;
    }
  }

  private move() {
    this.moveLeft();
    this.moveRight();
    if (!this.fallingDown) {
      this.jumpPress();
    }
  }
}
