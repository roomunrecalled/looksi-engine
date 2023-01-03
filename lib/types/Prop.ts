import type Pose from './Pose';
import StageObject from './StageObject';

class Prop extends StageObject {
  dataType = 'prop';

  isSolid: boolean;

  constructor(
      isSolid = false,
      poses: Map<string, Pose>,
      id: number = null
  ) {
    super(poses, id);
    this.isSolid = isSolid;
  }
}

export default Prop;
