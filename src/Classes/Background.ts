import { Image } from '../Image';
import { ctx } from '../Content';

export class Background {
  private width = 0;
  // private height = 0;
  private x = 0;
  private y = 0;
  speed = 0;
  private url: string;
  private image: HTMLImageElement;

  async draw() {
    ctx.drawImage(this.image, this.x, this.y);
    return this;
  }

  async drawMultipleRight(total: number) {
    let newBackground = this as Background;
    this.draw();
    for (let i = 1; i < total; i++) {
      newBackground = await newBackground.drawRightOf(newBackground);
    }
    return this;
  }

  async drawRightOf(background: Background) {
    const backNew = await new Background().init(this.url);
    backNew.x = background.x + background.width;
    backNew.y = background.y;
    return backNew.draw();
  };

  // private remove() {
  //   ctx.clearRect(this.x, this.y, this.width, this.height);
  //   return this;
  // }

  public async init(url: string) {
    this.url = url;
    this.image = await Image.loadImage(url);
    this.width = this.image.width;
    // this.height = this.image.height;
    return this;
  }
}
