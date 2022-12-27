import DataObject from "./DataObject"
import type Pose from "./Pose"
import type { SpriteFrame } from "./SpriteFrame";

abstract class VisualObject extends DataObject {
    // The poses contained by this object.
    poses: Map<string, Pose>

    protected constructor(poses = new Map<string, Pose>(), id: number) {
        super(id);
        this.poses = poses;
    }

    // Returns the appropriate SpriteFrame for the current pose
    getSpriteFrame(pose: string, frame = 0, modifiers = {}): SpriteFrame | null {
        if (this.poses.get(pose)) {
            return this.poses.get(pose)[frame];
        }

        return null;
    }
}

export default VisualObject

