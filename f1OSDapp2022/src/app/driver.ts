export interface Driver {
    _id: string,
    name : string,
    number: number,
    constructor: string,
    age: number,
    origin : { nationality : string },
    tags: [string];
}
