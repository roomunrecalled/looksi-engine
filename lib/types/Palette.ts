import DataObject from "./DataObject";

class Palette extends DataObject {
    dataType = 'palette'

    // Default palette colors are based off the DB8 palette by Dawnbringer.
    // The black and off-white colors are omitted, since they are set per-game.
    colors = [
        "#55415f",
        "#646964",
        "#d77355",
        "#508cd7",
        "#64b964",
        "#e6c86e",
    ]
}

export default Palette;