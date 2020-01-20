import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import utils from '../utils'

export class ModelThree {

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

    mixers: any
    clock: THREE.Clock

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
        this.mixers = []
        this.clock = new THREE.Clock()

        this.scene = new THREE.Scene()

        this.createCamera()
        this.createControls()
        this.createLights()
        this.loadModels()
        this.createRenderer()

        this.renderer.setAnimationLoop(() => {
            this.update()
            this.render()
        })
    }

    private createCamera() {
        this.camera = new THREE.PerspectiveCamera(35, this.container.clientWidth / this.container.clientHeight, 1, 100);
        this.camera.position.set(-1.5, 1.5, 6.5);
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

    private loadModels() {

        const loader = new GLTFLoader()

        // A reusable function to set up the models. We're passing in a position parameter
        // so that they can be individually placed around the scene
        const onLoad = (gltf, position) => {

            const model = gltf.scene.children[0]
            model.position.copy(position)

            const animation = gltf.animations[0]

            const mixer = new THREE.AnimationMixer(model)
            this.mixers.push(mixer)

            const action = mixer.clipAction(animation)
            action.play()

            this.scene.add(model)
        }

        // the loader will report the loading progress to this function
        const onProgress = () => { }

        // the loader will send any error messages to this function, and we'll log
        // them to to console
        const onError = (errorMessage) => { console.log(errorMessage) }

        // load the first model. Each model is loaded asynchronously,
        // so don't make any assumption about which one will finish loading first
        const parrotPosition = new THREE.Vector3(0, 0, 2.5)
        loader.load('/assets/models/parrot.glb', gltf => onLoad(gltf, parrotPosition), onProgress, onError)

        const flamingoPosition = new THREE.Vector3(7.5, 0, -10)
        loader.load('/assets/models/flamingo.glb', gltf => onLoad(gltf, flamingoPosition), onProgress, onError)

        const storkPosition = new THREE.Vector3(0, -2.5, -10)
        loader.load('/assets/models/stork.glb', gltf => onLoad(gltf, storkPosition), onProgress, onError)
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

    private update() {
        const delta = this.clock.getDelta();

        for (const mixer of this.mixers) {
            mixer.update(delta);
        }
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