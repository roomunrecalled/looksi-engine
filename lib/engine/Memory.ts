import type { DataObject, Prop, Room } from '../types'
import type { Point } from "pixi.js";
import {utils} from "pixi.js";

// Fancy name for a shared memory space.
class Memory {
    props: PropFile[] = []
    addProp(prop: Prop) {
        const propFile = new PropFile();
        propFile.item = prop;

        this.props.push(propFile);
    }

    room: RoomFile
    // Room methods
    changeRoom(room: Room) {
        const roomFile = new RoomFile();
        roomFile.item = room;

        this.room = roomFile;
    }

    // Text memory

    // Color memory
    colorB: "0x000000";
    colorW: "0xffffff";

    // Color methods
    getBW() {
        return {
            b: utils.string2hex(this.colorB),
            w: utils.string2hex(this.colorW)
        }
    }

    getPalette() {
        return {
            bw: this.getBW(),
            colors: this.room.getPalette().colors
        }
    }
}

class MemoryFile {
    item: DataObject

    getId = () => this.item.id
}

class PropFile extends MemoryFile {
    declare item: Prop

    getSpriteFrame() {
        return this.item.getSpriteFrame(this.currentPose, this.currentFrame);
    }

    // Position of the Prop in the room.
    position: Point

    // The current pose being displayed at the moment.
    currentPose = ""
    // The frame from the current pose to display at the moment.
    currentFrame = 0

    static compareFunction = (a, b) => {
        // sort first by vertical position
        const vPos = a.position.y - b.position.y

        if (vPos == 0) {
            // otherwise, sort by horizontal position
            const hPos = a.position.x - b.position.x

            if (hPos == 0) {
                // and if that fails, sort by object ID.
                return a.getId().localeCompare(b.getId())
            }
            return hPos
        } else {
            return vPos
        }
    }
}

class RoomFile extends MemoryFile {
    declare item: Room

    getPalette() {
        return this.item.palette;
    }
}

export {
    Memory,
    PropFile,
    RoomFile,
}
