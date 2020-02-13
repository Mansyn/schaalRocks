import { ThreeSpace } from './lib/three/space'
import { TrackDatabase } from './lib/services/db'

import { loader } from './lib/utils/loader'
import { track } from './lib/models/track'

export class Rock {

    space: ThreeSpace
    db: TrackDatabase
    databaseCreated: boolean
    postPerformed: boolean

    constructor() {
        this.db = new TrackDatabase()
        this.space = new ThreeSpace(this.db)
    }

    init() {
        //this.db.tracks.clear()
        this.db.tracks.toArray()
            .then(tracks => {
                if (!tracks.length) {
                    loader.trackList().forEach(tr => this.getAudioFile(tr))
                }
                this.space.load()
            })
    }

    
    getAudioFile(track: track) {

        let that = this
        let xhr = new XMLHttpRequest()

        xhr.open('GET', track.path, true)
        xhr.responseType = 'blob'

        xhr.addEventListener('load', function () {
            if (xhr.status === 200) {

                let blob = xhr.response
                //console.log("Blob:" + blob)

                track.file = blob
                that.db.tracks.add(track)
            }
        }, false)
        // Send XHR
        xhr.send()
    }
}