import Guid from './guid'

export default class Rock {
    id: string
    name: string
    constructor(_name: string) {
        this.id = Guid.newGuid()
        this.name = _name
    }
}