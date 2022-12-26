import DataObject from "./DataObject";

class Frame extends DataObject {
    dataType = 'frame'

    data: Pixel[]

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
    // Transparent
    X = 5,
    // Black
    B = 6,
    // White
    W = 7,
}

export {
    Frame,
    Pixel,
}