import chroma from 'chroma-js';
import * as PIXI from 'pixi.js';
import type {Memory} from './Memory';
import {Pixel, SpriteFrame} from '../types';
import {Sprite, Texture} from 'pixi.js';

// constants
const TRANSPARENT = chroma('#00000000').gl();

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
      const spriteFrame = propFile.getSpriteFrame();
      const buffer = (spriteFrame) ?
          spriteToTextureBuffer(spriteFrame, self.memoryRef.getPalette()) :
          null;

      if (buffer) {
        const sprite = new Sprite(
            Texture.fromBuffer(
                buffer, 16, 24, {
                  format: PIXI.FORMATS.RGBA,
                  type: PIXI.TYPES.FLOAT,
                })
        );
        sprite.x = propFile.position.x;
        sprite.y = propFile.position.y;

        console.log(sprite);
        sprite.scale = new PIXI.ObservablePoint(null, null, 3, 3);
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
    palette: { bw: {b: string, w: string }, colors: string[] }
): Float32Array {
  // TODO: add 'lru-cache' package to avoid reconstructing each frame.
  const buffer = new Float32Array(frame.data.length * 4);

  const bw = {
    b: chroma(palette.bw.b).gl(),
    w: chroma(palette.bw.w).gl(),
  };

  const colors = palette.colors.map((value) => chroma(value).gl());
  console.log(bw);
  console.log(colors);

  frame.data.forEach((pixel, index) => {
    let color: number[];
    switch (pixel) {
      case Pixel.B:
        color = bw.b;
        break;
      case Pixel.W:
        color = bw.w;
        break;
      case Pixel.X:
        color = TRANSPARENT;
        break;
      default:
        color = colors[pixel.valueOf()];
        break;
    }

    color.forEach(
        (channelVal, channelIndex) => {
          buffer[index * 4 + channelIndex] = channelVal;
        }
    );
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
