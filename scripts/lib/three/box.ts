import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import utils from '../utils/helpers'

export class BoxThree {

    container: HTMLDivElement
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    controls: OrbitControls
    geometry: THREE.BoxBufferGeometry
    textureLoader: THREE.TextureLoader
    material: THREE.MeshStandardMaterial
    mesh: THREE.Mesh
    light: THREE.DirectionalLight
    renderer: THREE.WebGLRenderer

    fov: number
    aspect: number
    near: number
    far: number

    constructor() {
        this.dom()
    }

    private dom() {
        this.container = utils.castDivElem(document.createElement('div'))
        this.container.setAttribute('id', 'scene-container')
        this.container.setAttribute('class', 'dropzone lose-outline')
        document.getElementById('board').appendChild(this.container)
    }
    
    public init() {
        this.scene = new THREE.Scene()

        this.createCamera()
        this.createControls()
        this.createLights()
        this.createMeshes()
        this.createRenderer()

        this.renderer.setAnimationLoop(() => {
            this.update()
            this.render()
        })
    }

    private createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            35, // FOV
            this.container.clientWidth / this.container.clientHeight, // aspect
            0.1, // near clipping plane
            100, // far clipping plane
        )
        this.camera.position.set(-4, 4, 10)
    }

    private createControls() {
        this.controls = new OrbitControls(this.camera, this.container);
    }

    private createLights() {
        const ambientLight = new THREE.HemisphereLight(
            0xddeeff, // sky color
            0x202020, // ground color
            5, // intensity
        )

        const mainLight = new THREE.DirectionalLight(0xffffff, 5)
        mainLight.position.set(10, 10, 10)

        this.scene.add(ambientLight, mainLight)
    }

    private createMeshes() {
        const geometry = new THREE.BoxBufferGeometry(2, 2, 2)
        const textureLoader = new THREE.TextureLoader()
        const texture = textureLoader.load('/assets/textures/uv_test_bw.png')
        texture.encoding = THREE.sRGBEncoding;
        texture.anisotropy = 16;
        const material = new THREE.MeshStandardMaterial({
            map: texture,
        })
        this.mesh = new THREE.Mesh(geometry, material)
        this.scene.add(this.mesh)
    }

    private createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        this.renderer.setClearColor(0x000000, 0)
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)

        this.renderer.setPixelRatio(window.devicePixelRatio)

        this.renderer.gammaFactor = 2.2
        this.renderer.outputEncoding = THREE.GammaEncoding

        this.renderer.physicallyCorrectLights = true

        this.container.appendChild(this.renderer.domElement)
    }

    // perform any updates to the scene, called once per frame
    // avoid heavy computation here
    private update() {
        // Don't delete this function!
    }

    private render() {
        this.renderer.render(this.scene, this.camera)
    }

    public onWindowResize = () => {
        // set the aspect ratio to match the new browser window aspect ratio
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;

        // update the camera's frustum
        this.camera.updateProjectionMatrix();

        // update the size of the renderer AND the canvas
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
}