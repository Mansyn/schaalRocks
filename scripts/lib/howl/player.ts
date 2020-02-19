import { Howl } from 'howler'
import * as THREE from 'three'

import { COLORS } from './../utils/constants'

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
                that.togglePlayingMesh(_intersect.object, true)
            },
            onend: function () {
                that.togglePlayingMesh(_intersect.object, false)
            }
        })
    }


    private togglePlayingMesh(object: THREE.Object3D, playing: boolean) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = playing ? new THREE.MeshStandardMaterial({ color: COLORS.RED2 }) : new THREE.MeshStandardMaterial({ color: COLORS.WHITE })
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