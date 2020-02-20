import { TRACK, COLORS } from './constants'
import { Material } from 'three'
import THREE = require('three')

export class threeUtils {
    static hasOverlap(existingPositions: THREE.Vector3[], track_position: THREE.Vector3): Boolean {
        let overlapping = false
        for (let i = 0; i < existingPositions.length; i++) {
            let existing = existingPositions[i]
            let distance = track_position.distanceTo(existing)

            if (distance < TRACK.WIDTH + 55) {
                // They are overlapping
                overlapping = true
                // do not add to array
                break
            }
        }
        return overlapping
    }

    static castMaterial(m: Material | Material[]): Material[] { 
        if (Array.isArray(m)) {
            return m as Material[]
        } else {
            return new Array(m)
        }
    }

    static togglePlayingMesh(object: THREE.Object3D, playing: boolean) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = playing ? new THREE.MeshStandardMaterial({ color: COLORS.RED }) : new THREE.MeshStandardMaterial({ color: COLORS.WHITE })
            }
        })
    }

    static toggleLoopingMesh(object: THREE.Object3D, looping: boolean) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = looping ? new THREE.MeshStandardMaterial({ color: COLORS.BLACK }) : new THREE.MeshStandardMaterial({ color: COLORS.WHITE })
            }
        })
    }
}
