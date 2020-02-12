import { ThreeSpace } from './lib/three/space'

export class Rock {

    space: ThreeSpace

    constructor() {
        this.space = new ThreeSpace()
    }

    init() {
        this.space.load()
    }
}