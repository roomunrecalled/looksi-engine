import DataObject from "./DataObject"
import type Pose from "./Pose"
import type { SpriteFrame } from "./SpriteFrame";

class VisualObject extends DataObject {
    // The poses contained by this object.
    poses: Map<string, Pose> = new Map<string, Pose>();

    // Returns the appropriate SpriteFrame for the current pose
    getSpriteFrame(pose: string, frame = 0, modifiers = {}): SpriteFrame | null {
        if (this.poses.get(pose)) {
            return this.poses.get(pose)[frame];
        }

        return null;
    }
}

export default VisualObject

