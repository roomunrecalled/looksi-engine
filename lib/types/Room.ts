import Backdrop from './Backdrop';
import DataObject from './DataObject';
import Palette from './Palette';

class Room extends DataObject {
  dataType = 'room';

  palette: Palette;

  backdrop: Backdrop;

  constructor(
      palette = new Palette(),
      backdrop = new Backdrop(),
      id: number = null
  ) {
    super(id);
    this.palette = palette;
    this.backdrop = backdrop;
  }
}

export default Room;
