import type {DataObject, Prop, Room, StageObject} from '../types';
import type {ISpritesheetData} from 'pixi.js';
import {BaseTexture, Point, Sprite, Spritesheet} from 'pixi.js';

// Fancy name for a shared memory space.
class Memory {
  props: PropFile[] = [];

  addProp(prop: Prop) {
    // const propFile = new PropFile(prop);
    // propFile.initializeSpriteSheet();
    // this.props.push(propFile);
    this.props.push(new PropFile(prop));
  }

  room: RoomFile;
  // Room methods
  changeRoom(room: Room) {
    this.room = new RoomFile(room);
  }

  // Text memory

  // Color memory
  shadow = '#000000';
  highlight = '#ffffff';

  // Color methods
  getPalette() {
    return {
      bw: {
        b: this.shadow,
        w: this.highlight,
      },
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

abstract class StageFile {
  declare item: StageObject;
  // TODO: Spritesheet belonging to this PropFile. This spritesheet should
  //  have a BaseTexture object which contains all frames for all poses
  //  belonging to the prop; the current sprite associated with this
  //  Propfile will come from this spritesheet.
  //  See pixijs.io/guides/basics/textures for more information on this.
  spriteSheet: Spritesheet;
  spriteSheetMetadata: ISpritesheetData;

  // Position of the Prop in the room.
  position: Point;

  // The current pose being displayed at the moment.
  currentPose: string;
  // The frame from the current pose to display at the moment.
  currentFrame: number;

  // The current sprite associated with this PropFile.
  sprite: Sprite;

  protected constructor(item) {
    this.item = item;
  }

  // Creates a baseTexture object from all frames present in item, and then
  // sets the internal field for it.
  initializeBaseTexture(): BaseTexture {
    return null;
  }

  // Retrieves the internal sprite sheet metadata (as defined by PixiJS's
  // SpriteSheet object); if one doesn't exist, it is created from this.item.
  getSpriteSheetMetadata(): ISpritesheetData {
    if (this.spriteSheetMetadata) {
      return this.spriteSheetMetadata;
    }

    this.spriteSheetMetadata = null;
    return this.spriteSheetMetadata;
  }

  initializeSpriteSheet() {
    // Initialize the base texture object
    this.initializeBaseTexture();
    // Create the sprite sheet metadata object
    this.spriteSheet = new Spritesheet(
        this.initializeBaseTexture(),
        this.getSpriteSheetMetadata(),
    );
  }

  getSprite() {
    // Automatically grabs the sprite from the spritesheet according to
    // this.currentPose and this.currentFrame (?)
  }

  // Cleans up the base texture associated with this PropFile.
  // Todo: some sort of caching so we don't have to initialize the same base
  //  texture for multiple copies of the same prop?
  destroy() {
    if (this.spriteSheet) {
      this.spriteSheet.destroy(true);
    }
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

class PropFile extends MemoryFile {
  declare item: Prop;

  // Position of the Prop in the room.
  position: Point;

  // The current pose being displayed at the moment.
  currentPose: string;
  // The frame from the current pose to display at the moment.
  currentFrame: number;

  // The current sprite associated with this PropFile.
  sprite: Sprite;

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
    this.sprite = null;
  }

  getSpriteFrame() {
    return this.item.getSpriteFrame(this.currentPose, this.currentFrame);
  }
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
