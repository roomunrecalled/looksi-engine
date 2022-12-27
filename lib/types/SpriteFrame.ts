import DataObject from "./DataObject";

// frames should be 16 pixels wide, 24 pixels tall
const EXPECTED_LENGTH = 16 * 24;

class SpriteFrame extends DataObject {
    dataType = 'frame'

    data: Pixel[]

    constructor(
        data: Pixel[] = Array.from({ length: EXPECTED_LENGTH }, () => Pixel.X),
        id: number = null
    ) {
        super(id)
        if (data.length != EXPECTED_LENGTH) {
            throw new Error("Invalid array length given for SpriteFrame");
        }
        this.data = data;
    }

    // frameFromPng
    // frameToPng
}

enum Pixel {
    // Palette colors
    P0 = 0,
    P1 = 1,
    P2 = 2,
    P3 = 3,
    P4 = 4,
    P5 = 5,
    // Transparent
    X = 6,
    // Black
    B = 7,
    // White
    W = 8,
}

export {
    SpriteFrame,
    Pixel,
}
