import * as PIXI from 'pixi.js';
import type {Memory} from './Memory';
import {Pixel, SpriteFrame} from '../types';
import {Sprite, Texture, utils} from 'pixi.js';

// constants
const TRANSPARENT = utils.string2hex('0x00000000');

class LooksiDisplay {
  memoryRef: Memory;

  renderOptions: PIXI.IRenderOptions;

  renderer: PIXI.AbstractRenderer;
  ticker: PIXI.Ticker;
  centerStage: PIXI.Container;

  elapsed = 0;


  constructor(view: HTMLCanvasElement, memoryRef: Memory) {
    console.log('Linking memory to display...');
    this.memoryRef = memoryRef;

    console.log('constructing display...');

    this.renderOptions = {...DEFAULT_OPTIONS};
    this.renderOptions.view = view;

    console.log('- initializing ticker.');
    this.ticker = PIXI.Ticker.shared;
    this.ticker.autoStart = false;
    this.ticker.stop();

    console.log('- initializing renderer.');
    this.renderer = PIXI.autoDetectRenderer(this.renderOptions);

    console.log('- initializing main stage.');
    this.centerStage = new PIXI.Container();
    this.centerStage.width = this.renderOptions.width;
    this.centerStage.height = this.renderOptions.height;
  }

  run() {
    this.setup();

    this.ticker.add(this.renderCallback(this));
    this.ticker.start();
  }

  setup() {
    // setup code
  }

  // This function returns a callback function. It can't be a simple
  // function because of how 'this' works in JS functions. =.=
  renderCallback(self: LooksiDisplay) {
    // TEST CODE
    const obj = new PIXI.Graphics();
    obj.beginFill(0xfe0);
    obj.drawRect(10, 10, 60, 60);

    self.centerStage.addChild(obj);

    console.log(self.memoryRef.props);
    for (const propFile of self.memoryRef.props) {
      console.log(propFile);
      const spriteFrame = propFile.getSpriteFrame();
      console.log(spriteFrame);
      const buffer = (spriteFrame) ?
          spriteToTextureBuffer(spriteFrame, self.memoryRef.getPalette()) :
          null;

      if (buffer) {
        const sprite = new Sprite(Texture.fromBuffer(buffer, 16, 24));
        sprite.x = propFile.position.x;
        sprite.y = propFile.position.y;

        self.centerStage.addChild(sprite);
      }
    }

    // TEST CODE

    return function(delta: number) {
      self.elapsed += delta;

      // obj.x = 10 + Math.cos(self.elapsed/5.0) * 10.0;
      // render backdrop

      // render props
      /*
      for (const propFile of self.memoryRef.props) {
        const spriteFrame = propFile.getSpriteFrame()
        const buffer = (spriteFrame) ?
          spriteToTextureBuffer(spriteFrame, self.memoryRef.getPalette()) :
          null;

        if (buffer) {
          const sprite = new Sprite(Texture.fromBuffer(buffer, 16, 24));
          sprite.x = propFile.position.x;
          sprite.y = propFile.position.y;

          self.centerStage.addChild(sprite);
        }
      }
       */
      self.renderer.render(self.centerStage);
    };
  }
}

function spriteToTextureBuffer(
    frame: SpriteFrame,
    palette: { bw: { b:number, w: number }, colors: string[] }
): Float32Array {
  // TODO: add 'lru-cache' package to avoid reconstructing each frame.
  const buffer = new Float32Array(frame.data.length);

  const bw = palette.bw;
  const colors = palette.colors.map((value) => utils.string2hex(value));

  frame.data.forEach((pixel, index) => {
    switch (pixel) {
      case Pixel.B:
        buffer[index] = bw.b;
        break;
      case Pixel.W:
        buffer[index] = bw.w;
        break;
      case Pixel.X:
        buffer[index] = TRANSPARENT;
        break;
      default:
        buffer[index] = colors[pixel.valueOf()];
        break;
    }
  });

  return buffer;
}

const DEFAULT_OPTIONS: PIXI.IRenderOptions = {
  antialias: false,
  autoDensity: false,
  backgroundColor: 0xeeeeee,
  backgroundAlpha: 1,
  useContextAlpha: true,
  clearBeforeRender: true,
  preserveDrawingBuffer: false,
  legacy: false,

  view: null,
  width: 384,
  height: 224,
};

export {
  LooksiDisplay,
  spriteToTextureBuffer,
};
