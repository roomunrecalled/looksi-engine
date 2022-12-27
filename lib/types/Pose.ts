import DataObject from "./DataObject";
import type { spriteFrame } from "./SpriteFrame";

class Pose extends DataObject {
    dataType = 'pose'

    // The frame delay between each sprite. If undefined, defaults to 30. Since
    // the renderer runs at 30fps, this means animations play at 1fps.
    speed = 30

    // Determines if the animation will loop by default.
    loop = false

    frames: spriteFrame[]
}

export default Pose