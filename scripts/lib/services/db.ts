import Dexie from 'dexie'

export class TrackDatabase extends Dexie {
    tracks: Dexie.Table<Itrack, number>

    constructor() {
        super('TrackDatabase')
        this.version(1).stores({
            tracks: "++id,name,path"
        })
    }
}