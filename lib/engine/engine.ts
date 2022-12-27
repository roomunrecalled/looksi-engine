import {LooksiDisplay} from './display';
import {Memory} from './Memory';
import {Palette, Pixel, Pose, Prop, Room, SpriteFrame} from '../types';

class Looksi {
  display : LooksiDisplay;
  memory : Memory;

  constructor(view: HTMLCanvasElement) {
    console.log('constructing Looksi...');
    this.memory = new Memory();
    this.display = new LooksiDisplay(view, this.memory);
  }

  run() {
    this.testCode();
    console.log('running Looksi');
    this.display.run();
  }

  testCode() {
    console.log('Directly modifying memory space for testing...');
    const testRoom = new Room(new Palette());

    const data: Pixel[] = [];
    for (let i = 0; i < 16 * 24; i += 1) {
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

    const frames = [new SpriteFrame(data)];
    const poseMap = new Map<string, Pose>;
    poseMap.set('default', new Pose(undefined, undefined, frames));
    const testProp = new Prop(false, poseMap);

    this.memory.addProp(testProp);
    this.memory.changeRoom(testRoom);
    console.log(this.memory);
  }
}

export default Looksi;
