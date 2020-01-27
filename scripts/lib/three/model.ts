import * as THREE from 'three'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls'

import utils from '../utils/helpers'
import IO from '../utils/io'

export class ModelThree {

    container: HTMLDivElement
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    controls: MapControls
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
        this.container.setAttribute('class', 'dropzone')
        this.container.setAttribute('style', 'min-height:400px')
        document.getElementById('board').appendChild(this.container)
    }
    
    public init() {
        this.mixers = []
        this.clock = new THREE.Clock()

        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xffffff)
        this.scene.fog = new THREE.FogExp2(0xffffff, 0.002)

        this.createCamera()
        this.createLights()
        this.loadModels()
        this.createRenderer()
        this.createControls()

        this.renderer.setAnimationLoop(() => {
            this.update()
            this.render()
        })
    }

    private createCamera() {
        this.camera = new THREE.PerspectiveCamera(60, this.container.clientWidth / this.container.clientHeight, 1, 1000);
        this.camera.position.set(400, 200, 0);
    }

    private createControls() {
        this.controls = new MapControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.05

        this.controls.screenSpacePanning = false

        this.controls.minDistance = 100
        this.controls.maxDistance = 500

        this.controls.maxPolarAngle = Math.PI / 2
    }

    private createLights() {
        let light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1);
        this.scene.add(light);

        let light2 = new THREE.DirectionalLight(0x002288)
        light2.position.set(- 1, - 1, - 1);
        this.scene.add(light2);

        let light3 = new THREE.AmbientLight(0x222222)
        this.scene.add(light3);
    }

    private loadModels() {

        var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        geometry.translate(0, 0.5, 0);
        var material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

        let trackList = IO.trackList()

        for (var i = 0; i < trackList.length; i++) {

            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = Math.random() * 1600 - 800;
            mesh.position.y = 0;
            mesh.position.z = Math.random() * 1600 - 800;
            mesh.scale.x = 20
            mesh.scale.y = Math.random() * 80 + 10;
            mesh.scale.z = 20;
            mesh.updateMatrix();
            mesh.matrixAutoUpdate = false;
            this.scene.add(mesh);

        }
    }

    private createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)

        this.renderer.setPixelRatio(window.devicePixelRatio)

        this.renderer.gammaFactor = 2.2
        this.renderer.outputEncoding = THREE.GammaEncoding

        this.renderer.physicallyCorrectLights = true

        this.container.appendChild(this.renderer.domElement)
    }

    private update() {
        this.controls.update()
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