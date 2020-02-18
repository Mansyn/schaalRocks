import { TRACK } from './constants'
import { Material } from 'three'

export class threeUtils {
    static hasOverlap(existingPositions: THREE.Vector3[], track_position: THREE.Vector3): Boolean {
        let overlapping = false
        for (let i = 0; i < existingPositions.length; i++) {
            let existing = existingPositions[i]
            let distance = track_position.distanceTo(existing)

            if (distance < TRACK.WIDTH) {
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
}
