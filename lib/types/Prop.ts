import DataObject from "./DataObject";
import type Pose from "./Pose";
import VisualObject from "./VisualObject";

class Prop extends VisualObject {
    dataType = 'prop'

    isSolid: boolean

    constructor(
        isSolid = false,
        poses: Map<string, Pose>,
        id: number = null
    ) {
        super(poses, id);
        this.isSolid = isSolid;
    }
}

export default Prop
