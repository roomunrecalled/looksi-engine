import LooksiDisplay from "./display"

class Looksi {
  display : LooksiDisplay;

  constructor (view: HTMLCanvasElement) {
    console.log('constructing Looksi...')
    this.display = new LooksiDisplay(view);
  }

  run () {
    console.log('running Looksi');
    this.display.run();
  }
}

export default Looksi;
