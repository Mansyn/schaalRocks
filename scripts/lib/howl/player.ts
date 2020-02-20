import { Howl } from 'howler'
import * as THREE from 'three'

import { threeUtils } from '../utils/three'

export class player {

    howl: any
    id: string
    intersect: THREE.Intersection

    constructor(_track: Itrack, _intersect: THREE.Intersection) {
        const that = this
        this.intersect = _intersect
        let blobUrl = window.URL.createObjectURL(_track.file)
        this.howl = new Howl({
            src: [blobUrl],
            format: 'flac',
            onload: function () {
                threeUtils.togglePlayingMesh(_intersect.object, true)
            },
            onend: function () {
                threeUtils.togglePlayingMesh(_intersect.object, false)
            }
        })
    }

    play() {
        this.howl.play()
    }

    stop() {
        this.howl.stop()
    }
}