import { LooksiDisplay, windowResizeHandler } from "./display"

class Looksi {
  display : LooksiDisplay;
  anchorElement : HTMLElement;
  window : Window;

  constructor (view: HTMLElement, window: Window, scaleMode = 2) {
    console.log('constructing Looksi...')
    if (view.parentElement.nodeName.toLowerCase() === 'div') {
      this.anchorElement = view;
    } else {
      throw Error('Expected anchor element to be a <div>.');
    }

    const canvas = document.createElement('canvas');
    this.anchorElement.appendChild(canvas);
    this.display = new LooksiDisplay(canvas, scaleMode);

    console.log(window);
    this.window = window;
  }

  run () {
    console.log('running Looksi');
    // attach the window resize event handler
    this.window.addEventListener('resize', windowResizeHandler(this.anchorElement));
    
    try {
      this.display.run();
    } catch (error) {
      console.log(error);
    }
  }
}

export default Looksi;
