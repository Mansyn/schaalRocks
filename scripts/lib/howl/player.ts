import { Howl } from 'howler'
import * as THREE from 'three'

import { track } from '../models/track'
import { COLORS } from '../utils/constants'

export class player {

    howl: any
    id: string

    constructor(_track: track, intersect: THREE.Intersection) {
        const that = this
        this.id = _track.id
        this.howl = new Howl({
            src: [_track.path],
            loop: false,
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