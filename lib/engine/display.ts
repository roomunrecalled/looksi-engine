import * as PIXI from 'pixi.js';

const BASE_RESOLUTION = { width: -1, height: -1 };

const DEFAULT_OPTIONS: PIXI.IRenderOptions = {
  antialias: false,
  autoDensity: true,
  backgroundColor: 0x000,
  backgroundAlpha: 1,
  useContextAlpha: true,
  clearBeforeRender: true,
  preserveDrawingBuffer: false,
  legacy: false,

  view: null,
  width: BASE_RESOLUTION.width,
  height: BASE_RESOLUTION.height,
};

class LooksiDisplay {
  renderOptions: PIXI.IRenderOptions;

  renderer: PIXI.AbstractRenderer;
  scaleStage: PIXI.Container;
  ticker: PIXI.Ticker;

  centerStage: PIXI.Container;

  elapsed = 0;

  constructor (view: HTMLCanvasElement, scaleMode: number) {
    console.log('constructing display...');

    console.log(view.parentElement.clientWidth);
    console.log(view.parentElement.clientHeight);
    console.log(view);

    this.renderOptions = { ... DEFAULT_OPTIONS };
    this.renderOptions.view = view;
    this.renderOptions.width *= scaleMode;
    this.renderOptions.height *= scaleMode;

    console.log('- initializing ticker.')
    this.ticker = PIXI.Ticker.shared;
    this.ticker.autoStart = false;
    this.ticker.stop();

    console.log('- initializing renderer.');
    this.renderer = PIXI.autoDetectRenderer(this.renderOptions);
    console.log(this.renderer);

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

function windowResizeHandler(displayParent: HTMLElement) {
  const defaultResizeTimeout = 250;

  let timeout = null;

  const resizeFunction = function () {
    console.log(displayParent);
  }

  return (event: UIEvent) => {
    clearTimeout(timeout);

    timeout = setTimeout(resizeFunction, defaultResizeTimeout);
  }
}

export { 
  LooksiDisplay,
  windowResizeHandler
};
