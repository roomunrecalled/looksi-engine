import DataObject from "./DataObject";
import type { SpriteFrame } from "./SpriteFrame";

class Pose extends DataObject {
    dataType = 'pose'

    // The frame delay between each sprite. If undefined, defaults to 30. Since
    // the renderer runs at 30fps, this means animations play at 1fps.
    speed: number

    // Determines if the animation will loop by default.
    loop: boolean

    frames: SpriteFrame[]

    constructor(
        speed = 30,
        loop = false,
        frames: SpriteFrame[] = [],
        id: number = null
    ) {
        super(id);
        this.speed = speed;
        this.loop = loop;
        this.frames = frames;
    }
}

export default Pose
