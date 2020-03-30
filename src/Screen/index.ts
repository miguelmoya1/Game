import { ctx, canvas } from '../Content';
import { Background } from '../Classes/Background';
import { Image } from '../Image';

class _Screen {
  async setBackground() {
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    (await new Background().init('../../assets/background/background.png')).drawMultipleRight(4);
    (await new Background().init('../../assets/background/mid3.png')).drawMultipleRight(4);
    (await new Background().init('../../assets/background/mid2.png')).drawMultipleRight(4);
    (await new Background().init('../../assets/background/mid.png')).drawMultipleRight(4);
    (await new Background().init('../../assets/background/top.png')).drawMultipleRight(4);
    (await new Background().init('../../assets/background/floor.png')).drawMultipleRight(4);
    const img = await Image.loadImage('../../assets/Dude_Monster/Dude_Monster.png');
    ctx.drawImage(img, 200, 400);
  }
}

export const Screen = new _Screen();