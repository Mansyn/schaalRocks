import guid from '../utils/guid'

export default class rock {
    id: string
    name: string
    constructor(_name: string) {
        this.id = guid.newGuid()
        this.name = _name
    }
}