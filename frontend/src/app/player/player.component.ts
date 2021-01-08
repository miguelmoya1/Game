import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @ViewChild('image') image!: ElementRef<HTMLImageElement>;
  public id!: string;
  public hasMoveLogic = false;
  // private life = 50;
  private x = 0;
  private y = 0;
  private width = 0;
  // private height = 0;
  private speed = 8;
  private floor = 695;
  private firstJump = 0;
  private jumpSize = 20;
  private jumping = false;
  private fallingDown = false;
  private map: any = [];
  public imageFile = '../assets/Pink_Monster/Pink_Monster.png';

  constructor() {}

  ngOnInit(): void {
    document.addEventListener('keydown', (e) => {
      let key: number = e.key as any;
      this.map[key] = true;
      this.moveLogic();
    });

    document.addEventListener('keyup', (e) => {
      if (e.key in this.map) {
        this.moveLogic();
        this.map[e.key as any] = false;
      }
    });
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
      if (this.map['w'] || this.map[' ']) {
        this.jumping = true;
        this.firstJump = this.y;
        this.y -= this.speed;
      }
    }
  }

  private moveLeft() {
    if (this.map['a'] && this.x >= 0) {
      this.x -= this.speed;
    }
  }

  private moveRight() {
    if (this.map['d'] && this.x + this.width <= window.innerWidth) {
      this.x += this.speed;
    }
  }

  private moveLogic() {
    this.moveLeft();
    this.moveRight();
    if (!this.fallingDown) {
      this.jumpPress();
    }

    this.image.nativeElement.style.left = `${this.x}px`;
    this.image.nativeElement.style.top = `${this.y}px`;

    if (this.hasMoveLogic) {
      if (this.jumping) {
        this.jump();
      } else if (!this.jumping && this.y <= this.floor) {
        this.falling();
      }
    }
  }

  public getStyle() {
    return { top: `${this.y}px`, left: `${this.x}px` };
  }
}
