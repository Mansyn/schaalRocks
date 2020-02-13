import { ThreeSpace } from './lib/three/space'
import { TrackDatabase } from './lib/services/db'

import { loader } from './lib/utils/loader'
import { track } from './lib/models/track'

export class Rock {

    space: ThreeSpace
    db: TrackDatabase
    databaseCreated: boolean
    postPerformed: boolean
    allTracks: track[]

    constructor() {
        this.db = new TrackDatabase()
        this.space = new ThreeSpace(this.db)
        this.allTracks = []
    }

    init() {
        let that = this
        this.db.tracks.toArray()
            .then(tracks => {
                if (!tracks.length) {
                    loader.trackList().forEach(tr => that.db.tracks.add(tr))
                }
                this.space.load()
            })
    }
}