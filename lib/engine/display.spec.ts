import {Palette, Pixel, SpriteFrame} from '../types';
import {spriteToTextureBuffer} from './LooksiDisplay';
import {utils} from 'pixi.js';
import {equal} from 'assert';

describe('Display tests', () => {
  it('test SpriteFrame to Buffer logic', () => {
    // create a basic sprite frame.
    const length = 16 * 24;

    const data: Pixel[] = [];
    for (let i = 0; i < length; i += 1) {
      switch (i % 9) {
        case Pixel.B:
          data.push(Pixel.B);
          break;
        case Pixel.W:
          data.push(Pixel.W);
          break;
        case Pixel.X:
          data.push(Pixel.X);
          break;
        default:
          data.push(i % 9);
          break;
      }
    }

    // create a memory palette object for spriteToTextureBuffer
    const palette = {
      bw: {
        b: utils.string2hex('0x000000'),
        w: utils.string2hex('0xffffff'),
      },
      colors: new Palette().colors,
    };

    const spriteFrame = new SpriteFrame(data);
    const buffer: Float32Array = spriteToTextureBuffer(spriteFrame, palette);

    // check the output.
    for (let i = 0; i < length; i += 1) {
      const color = buffer[i];
      const mod = i % 9;
      switch (mod) {
        case Pixel.W:
          equal(color, palette.bw.w);
          break;
        case Pixel.B:
          equal(color, palette.bw.b);
          break;
        case Pixel.X:
          equal(color, utils.string2hex('0x00000000'));
          break;
        default:
          equal(color, utils.string2hex(palette.colors[mod]));
          break;
      }
    }
  });
});

