import DataObject from './DataObject';
import {Pixel} from './SpriteFrame';

// backdrops should be 192 pixels wide, 112 pixels tall
const EXPECTED_LENGTH = 192 * 112;

class Backdrop extends DataObject {
  dataType = 'backdrop';

  data: Pixel[];

  paletteIndex: number;

  constructor(
      data: Pixel[] = Array.from({length: EXPECTED_LENGTH}, () => Pixel.B),
      paletteIndex = 0,
      id: number = null,
  ) {
    super(id);
    if (data.length != EXPECTED_LENGTH) {
      throw new Error('Invalid array length given for Backdrop');
    }
    this.data = data;
    this.paletteIndex = paletteIndex;
  }
}

export default Backdrop;
