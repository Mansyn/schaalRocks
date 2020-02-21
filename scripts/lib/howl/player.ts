import { Howl } from 'howler'
import * as THREE from 'three'

import { threeUtils } from '../utils/three'

export class HowlPlayer {

    howl: Howl
    name: string
    looping: boolean
    cube: THREE.Object3D
    text: THREE.Object3D

    constructor(_track: Itrack, _cube: THREE.Object3D, _text: THREE.Object3D) {
        this.cube = _cube
        this.text = _text
        this.name = _track.name
        this.looping = false
        let blobUrl = window.URL.createObjectURL(_track.file)
        this.howl = new Howl({
            src: [blobUrl],
            format: 'flac',
            onend: function () {
                if (!this._loop) {
                    threeUtils.togglePlayingMesh(_cube, _text, false)
                }
            }
        })
    }

    play(): void {
        threeUtils.togglePlayingMesh(this.cube, this.text, true)
        this.looping = false
        this.howl.loop(false)
        this.howl.play()
    }

    toggleRepeat(): void {
        if (this.howl.playing()) {
            threeUtils.toggleLoopingMesh(this.cube, this.text, false)
            this.looping = false
            this.howl.stop()
        } else {
            threeUtils.toggleLoopingMesh(this.cube, this.text, true)
            this.looping = true
            this.howl.loop(true)
            this.howl.play()
        }
    }

    stop(): void {
        this.howl.stop()
    }
}