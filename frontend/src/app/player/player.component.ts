import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  public id!: string;
  @Input() hasMoveLogic = true;
  private x = window.innerWidth / 2;
  private y = window.innerHeight / 2 + window.innerHeight / 4;
  private width = 32;
  private height = 32;
  private speed = 2;
  private map: any = [];
  public imageFile = '../assets/Pink_Monster/Pink_Monster.png';

  @ViewChild('image') image!: ElementRef<HTMLImageElement>;

  constructor() {}

  ngOnInit(): void {
    if (this.hasMoveLogic) {
      document.addEventListener('keydown', (e) => {
        let key: number = e.key as any;
        this.map[key] = true;
      });

      document.addEventListener('keyup', (e) => {
        if (e.key in this.map) {
          this.map[e.key as any] = false;
        }
      });
    }
  }

  private moveUp() {
    if (this.map['w'] && this.y > 0) {
      this.y -= this.speed;
      return true;
    }
    return false;
  }

  private moveLeft() {
    if (this.map['a'] && this.x >= 0) {
      this.x -= this.speed;
      return true;
    }
    return false;
  }

  private moveRight() {
    if (this.map['d'] && this.x + this.width * 2 <= window.innerWidth) {
      this.x += this.speed;
      return true;
    }
    return false;
  }

  private moveDown() {
    if (this.map['s'] && this.y + this.height * 2 <= window.innerHeight) {
      this.y += this.speed;
      return true;
    }
    return false;
  }

  public move() {
    let moved = this.moveLeft();
    moved = this.moveRight() || moved;
    moved = this.moveUp() || moved;
    moved = this.moveDown() || moved;
    return moved;
  }

  public getStyle() {
    return { top: `${this.y}px`, left: `${this.x}px` };
  }
}
