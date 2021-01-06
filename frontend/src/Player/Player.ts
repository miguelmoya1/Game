import { Image } from "../Image/Image";

export class Player {
  public id: string;
  public hasMoveLogic = false;
  private life = 50;
  private x = 0;
  private y = 0;
  private width = 0;
  private height = 0;
  private speed = 8;
  private floor = 895;
  private firstJump = 0;
  private jumpSize = 20;
  private jumping = false;
  private fallingDown = false;
  private map: any = [];
  private image: HTMLImageElement;

  public isInit = false;

  async init(url: string) {
    this.image = document.getElementById(this.id) as HTMLImageElement;
    if (!this.image) {
      this.image = await Image.loadImage(url);
      document.body.appendChild(this.image);
    }
    this.height = this.image.height;
    this.width = this.image.width;
    this.image.id = this.id;
    this.image.style.position = "absolute";
    this.isInit = true;
    return this;
  }

  constructor(id: string, hasMoveLogic = false) {
    this.id = id;
    this.hasMoveLogic = hasMoveLogic;
    if (this.hasMoveLogic) {
      document.addEventListener("keydown", (e) => {
        let key: number = e.key as any;
        this.map[key] = true;
        this.moveLogic();
      });

      document.addEventListener("keyup", (e) => {
        if (e.key in this.map) {
          this.moveLogic();
          this.map[e.key as any] = false;
        }
      });
    }
  }

  getImage() {
    return this.image;
  }

  move() {
    if (this.hasMoveLogic) {
      if (this.jumping) {
        this.jump();
      } else if (!this.jumping && this.y <= this.floor) {
        this.falling();
      }
    }
    if (this.image) {
      this.image.style.left = `${this.x}px`;
      this.image.style.top = `${this.y}px`;
    }

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
    if (this.map["d"] && this.x + this.width <= window.innerWidth) {
      this.x += this.speed;
    }
  }

  private moveLogic() {
    this.moveLeft();
    this.moveRight();
    if (!this.fallingDown) {
      this.jumpPress();
    }
  }

  public setVar({ ...args }) {
    this.life = args.life || this.life;
    this.x = args.x || this.x;
    this.y = args.y || this.y;
    this.width = args.width || this.width;
    this.height = args.height || this.height;
    this.speed = args.speed || this.speed;
    this.floor = args.floor || this.floor;
    this.firstJump = args.firstJump || this.firstJump;
    this.jumpSize = args.jumpSize || this.jumpSize;
    this.jumping = args.jumping || this.jumping;
    this.fallingDown = args.fallingDown || this.fallingDown;
  }
}
