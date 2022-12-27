import DataObject from "./DataObject";
import type Pose from "./Pose";
import VisualObject from "./VisualObject";

class Prop extends VisualObject {
    dataType = 'prop'

    isSolid = false
}

export default Prop