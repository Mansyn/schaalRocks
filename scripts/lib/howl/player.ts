import { Howl } from 'howler'
import * as THREE from 'three'

import { threeUtils } from '../utils/three'

export class HowlPlayer {

    howl: Howl
    name: string
    looping: boolean
    intersect: THREE.Intersection

    constructor(_track: Itrack, _intersect: THREE.Intersection) {
        this.intersect = _intersect
        this.name = _track.name
        this.looping = false
        let blobUrl = window.URL.createObjectURL(_track.file)
        this.howl = new Howl({
            src: [blobUrl],
            format: 'flac',
            onend: function () {
                if (!this._loop) {
                    threeUtils.togglePlayingMesh(_intersect.object, false)
                }
            }
        })
    }

    play() {
        threeUtils.togglePlayingMesh(this.intersect.object, true)
        this.looping = false
        this.howl.loop(false)
        this.howl.play()
    }

    toggleRepeat() {
        if (this.howl.playing()) {
            threeUtils.toggleLoopingMesh(this.intersect.object, false)
            this.looping = false
            this.howl.stop()
        } else {
            threeUtils.toggleLoopingMesh(this.intersect.object, true)
            this.looping = true
            this.howl.loop(true)
            this.howl.play()
        }
    }

    stop() {
        this.howl.stop()
    }
}