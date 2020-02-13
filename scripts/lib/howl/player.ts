import { Howl } from 'howler'
import * as THREE from 'three'

import { COLORS } from '../utils/constants'

export class player {

    howl: any
    id: string

    constructor(_track: Itrack, intersect: THREE.Intersection) {
        const that = this
        let blobUrl = window.URL.createObjectURL(_track.file)
        this.howl = new Howl({
            src: [blobUrl],
            format: 'flac',
            onload: function () {
                that.togglePlayingMesh(intersect.object, true)
            },
            onend: function () {
                that.togglePlayingMesh(intersect.object, false)
            }
        })
    }


    private togglePlayingMesh(object: THREE.Object3D, playing: boolean) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshPhongMaterial({ color: (playing ? COLORS.BLACK : COLORS.RED2), specular: (playing ? COLORS.RED2 : COLORS.BLACK), shininess: 30 })
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