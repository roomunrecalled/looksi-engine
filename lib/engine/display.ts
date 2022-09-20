import * as PIXI from 'pixi.js';

class LooksiDisplay {
  renderOptions: PIXI.IRenderOptions;

  renderer: PIXI.AbstractRenderer;
  ticker: PIXI.Ticker;
  centerStage: PIXI.Container;

  elapsed = 0;

  constructor (view: HTMLCanvasElement) {
    console.log('constructing display...');

    this.renderOptions = { ... DEFAULT_OPTIONS };
    this.renderOptions.view = view;

    console.log('- initializing ticker.')
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
    const obj = new PIXI.Graphics();
    obj.beginFill(0xfe0);
    obj.drawRect(10,10,60,60);

    this.centerStage.addChild(obj);
  }

  // This function returns a callback function. It can't be a simple
  // function because of how 'this' works in JS functions. =.=
  renderCallback(self: LooksiDisplay) {
    return function(delta: number) {
      self.elapsed += delta;

      self.renderer.render(self.centerStage);
    }
  }
}

const DEFAULT_OPTIONS: PIXI.IRenderOptions = {
  antialias: false,
  autoDensity: false,
  backgroundColor: 0x000,
  backgroundAlpha: 1,
  useContextAlpha: true,
  clearBeforeRender: true,
  preserveDrawingBuffer: false,
  legacy: false,

  view: null,
  width: 384,
  height: 224,
};

export default LooksiDisplay;
