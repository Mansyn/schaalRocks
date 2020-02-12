import { guid } from '../utils/guid'

export class track {
    id: string
    name: string
    path: string
    constructor(_name: string, _path: string) {
        this.id = guid.newGuid()
        this.name = _name
        this.path = _path
    }
}