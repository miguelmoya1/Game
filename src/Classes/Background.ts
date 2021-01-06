import { Image } from '../Image/Image';
import { ctx } from '../Content/Content';

export class Background {
  private x = 0;
  private y = 0;
  private image: HTMLImageElement;

  public async init(url: string, x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.image = await Image.loadImage(url);
    return this.draw();
  }

  private async draw() {
    ctx.drawImage(this.image, this.x, this.y);
    return this;
  }
}
