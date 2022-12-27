
// idk if this will work, but theoretically this will just keep on incrementing
// as objects are created. In the future, IDs will be initialized either by
// reading the value from a source value or generated through another method.
let idNum = 0;

abstract class DataObject {
    readonly id: number
    dataType: string

    protected constructor(id: number) {
        this.id = id || idNum++;
    }

    getId() {
        return `${this.dataType}-${this.id}`;
    }
}

export default DataObject
