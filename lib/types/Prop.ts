import DataObject from "./DataObject";
import type Pose from "./Pose";

class Prop extends DataObject {
    dataType = 'prop'

    isSolid = false

    poses: Pose[]
}

export default Prop