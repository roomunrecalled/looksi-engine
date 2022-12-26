import type { DataObject } from '../types'
import type { Point } from "pixi.js";

// Fancy name for a shared memory space.
class Memory {
    props: PropFile[]

    // Backdrop memory
    backdrop: BackdropFile

    // Text memory

    // Color memory
}

class MemoryFile {
    object: DataObject

    getId = () => this.object.id
}

class PropFile extends MemoryFile {
    // Position of the Prop in the room.
    position: Point

    // The current Pose being displayed at the moment.
    currentPos = 0

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

class BackdropFile extends MemoryFile {

}

export default Memory
