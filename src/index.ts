import { ctx } from './Content';
import { Mouse } from './Mouse';

function main() {
  ctx.viewport(0, 0, ctx.drawingBufferWidth, ctx.drawingBufferHeight);
  ctx.clearColor(0.0, 0.5, 0.0, 1.0);
  // Clear the context with the newly set color. This is
  // the function call that actually does the drawing.
  ctx.clear(ctx.COLOR_BUFFER_BIT);
  console.log(ctx);
  // setInterval(() => { console.log(Mouse.pos); });
  console.log(Mouse.pos);
}

main();