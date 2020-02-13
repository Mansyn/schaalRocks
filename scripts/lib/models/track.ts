export class track {
    name: string
    path: string
    file: Blob
    
    constructor(_name: string, _path: string) {
        this.name = _name
        this.path = _path
    }
}