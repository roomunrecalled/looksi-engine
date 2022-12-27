import DataObject from "./DataObject";
import type Palette from "./Palette";

class Room extends DataObject {
    dataType = 'room'

    palette: Palette

    // backdrop: Backdrop
}

export default Room