import * as THREE from 'three'

export const COLORS = {
    WHITE: 0xFFFFFF,
    BLACK: 0x0E1C1C,
    RED: 0xA22825,
    RED2: 0xD31204
}

export const THREE_COLORS = {
    WHITE: new THREE.Color(COLORS.WHITE),
    BLACK: new THREE.Color(COLORS.BLACK)
}

export const THREE_FOG_COLORS = {
    WHITE: new THREE.FogExp2(COLORS.WHITE, 0.002),
    BLACK: new THREE.FogExp2(COLORS.BLACK, 0.002)
}