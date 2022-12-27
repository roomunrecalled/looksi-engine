import type {DataObject, Prop, Room} from '../types';
import {Point, utils} from 'pixi.js';

// Fancy name for a shared memory space.
class Memory {
  props: PropFile[] = [];
  addProp(prop: Prop) {
    this.props.push(new PropFile(prop));
  }

  room: RoomFile;
  // Room methods
  changeRoom(room: Room) {
    this.room = new RoomFile(room);
  }

  // Text memory

  // Color memory
  colorB = '0x000000';
  colorW = '0xffffff';

  // Color methods
  getBW() {
    return {
      b: utils.string2hex(this.colorB),
      w: utils.string2hex(this.colorW),
    };
  }

  getPalette() {
    return {
      bw: this.getBW(),
      colors: this.room.getPalette().colors,
    };
  }
}

abstract class MemoryFile {
  item: DataObject;

  protected constructor(item) {
    this.item = item;
  }

  getId() {
    return this.item.getId();
  }
}

class PropFile extends MemoryFile {
  declare item: Prop;

  // Position of the Prop in the room.
  position: Point;

  // The current pose being displayed at the moment.
  currentPose: string;
  // The frame from the current pose to display at the moment.
  currentFrame: number;

  constructor(
      prop: Prop,
      currentPose = 'default',
      currentFrame = 0,
      position = new Point(0, 0)
  ) {
    super(prop);
    this.currentPose = currentPose;
    this.currentFrame = currentFrame;
    this.position = position;
  }

  getSpriteFrame() {
    return this.item.getSpriteFrame(this.currentPose, this.currentFrame);
  }

  static compareFunction = (a, b) => {
    // sort first by vertical position
    const vPos = a.position.y - b.position.y;

    if (vPos == 0) {
      // otherwise, sort by horizontal position
      const hPos = a.position.x - b.position.x;

      if (hPos == 0) {
        // and if that fails, sort by object ID.
        return a.getId().localeCompare(b.getId());
      }
      return hPos;
    } else {
      return vPos;
    }
  };
}

class RoomFile extends MemoryFile {
  declare item: Room;

  constructor(room) {
    super(room);
  }

  getPalette() {
    return this.item.palette;
  }
}

export {
  Memory,
  PropFile,
  RoomFile,
};
