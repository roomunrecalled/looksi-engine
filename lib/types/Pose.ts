import DataObject from "./DataObject";
import type { Frame } from "./Frame";

class Pose extends DataObject {
    dataType = 'pose'

    // If a single number, the frame delay between each pose. If undefined,
    // defaults to 30. Since the renderer runs at 30fps, this amounts to 30
    // frames per second.
    speed: number

    loop = false

    frames: Frame[]
}

export default Pose