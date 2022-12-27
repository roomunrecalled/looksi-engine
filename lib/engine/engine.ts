import LooksiDisplay from "./display"
import {Memory, RoomFile} from "./Memory";
import {Palette, Pose, Prop, Room, SpriteFrame} from "../types";

class Looksi {
  display : LooksiDisplay;
  memory : Memory

  constructor (view: HTMLCanvasElement) {
    console.log('constructing Looksi...')
    this.memory = new Memory();
    this.display = new LooksiDisplay(view, this.memory);
  }

  run () {
    this.testCode();
    console.log('running Looksi');
    this.display.run();
  }

  testCode () {
    console.log("Directly modifying memory space for testing...")
    const testRoom = new Room();
    testRoom.palette = new Palette();

    const testProp = new Prop();
    const testPose = new Pose();
    testPose.frames = [new SpriteFrame()];
    testProp.poses.set("default", testPose);

    this.memory.addProp(testProp);
    this.memory.changeRoom(testRoom);
    console.log(this.memory);
  }
}

export default Looksi;
