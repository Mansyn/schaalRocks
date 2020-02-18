import { Howl } from 'howler'
import * as THREE from 'three'

export class player {

    howl: any
    id: string
    intersect: THREE.Intersection

    constructor(_track: Itrack, _intersect: THREE.Intersection, _cubeMaterials: THREE.MeshBasicMaterial[], _clickedCubeMaterials: THREE.MeshBasicMaterial[]) {
        const that = this
        this.intersect = _intersect
        let blobUrl = window.URL.createObjectURL(_track.file)
        this.howl = new Howl({
            src: [blobUrl],
            format: 'flac',
            onload: function () {
                that.togglePlayingMesh(_intersect.object, true, _cubeMaterials, _clickedCubeMaterials)
            },
            onend: function () {
                that.togglePlayingMesh(_intersect.object, false, _cubeMaterials, _clickedCubeMaterials)
            }
        })
    }


    private togglePlayingMesh(object: THREE.Object3D, playing: boolean, cubeMaterials, clickedCubeMaterials) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = playing ? clickedCubeMaterials : cubeMaterials
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