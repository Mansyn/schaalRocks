import * as THREE from 'three'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls'

import helpers from '../utils/helpers'
import loader from '../utils/loader'

export class ThreeSpace {

    container: HTMLDivElement
    loadingManager: THREE.LoadingManager
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    controls: MapControls
    geometry: THREE.BoxBufferGeometry
    textureLoader: THREE.TextureLoader
    mesh: THREE.Mesh
    light: THREE.DirectionalLight
    renderer: THREE.WebGLRenderer

    mixers: any
    clock: THREE.Clock
    font: THREE.Font

    fov: number
    aspect: number
    near: number
    far: number

    constructor() {
        this.dom()
    }

    private dom() {
        this.container = helpers.castDivElem(document.createElement('div'))
        this.container.setAttribute('id', 'scene-container')
        this.container.setAttribute('class', 'dropzone')
        this.container.setAttribute('style', 'min-height:400px')
        document.getElementById('board').appendChild(this.container)
    }
    
    public load() {
        const that = this

        this.loadingManager = new THREE.LoadingManager()
        this.loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
            console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
        }
        this.loadingManager.onLoad = function () {
            console.log('Loading complete')
            that.init()
        }
        this.loadingManager.onError = function (url) {
            console.log('There was an error loading ' + url)
        }

        const loader = new THREE.FontLoader(this.loadingManager)
        loader.load('assets/fonts/Reznor_Broken.json', function (response) {
            that.font = response
        })
    }

    private init() {
        this.mixers = []
        this.clock = new THREE.Clock()

        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xffffff)
        this.scene.fog = new THREE.FogExp2(0xffffff, 0.002)
        
        this.createCamera()
        this.createLights()
        this.createRenderer()
        this.loadModels()
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
        let light = new THREE.DirectionalLight(0xffffff)
        light.position.set(1, 1, 1)
        this.scene.add(light)

        let light2 = new THREE.DirectionalLight(0x690707)
        light2.position.set(- 1, - 1, - 1)
        this.scene.add(light2)

        let light3 = new THREE.AmbientLight(0x222222)
        this.scene.add(light3)
    }

    private loadModels() {
        const trackList = loader.trackList()
        let box_geometry = new THREE.BoxBufferGeometry(1, 1, 1)
        box_geometry.translate(0, 0.5, 0)
        const box_material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })

        for (var i = 0; i < trackList.length; i++) {

            let track_mesh = new THREE.Mesh(box_geometry, box_material);
            track_mesh.position.x = Math.random() * 1600 - 800
            track_mesh.position.y = 0
            track_mesh.position.z = Math.random() * 1600 - 800
            track_mesh.scale.x = 20
            track_mesh.scale.y = Math.random() * 80 + 10
            track_mesh.scale.z = 20
            track_mesh.updateMatrix()
            track_mesh.matrixAutoUpdate = false

            const geom = new THREE.TextGeometry(trackList[i].name.toUpperCase(), {
                font: this.font,
                size: 10,
                height: 1,
                curveSegments: 30
            })

            const text_material = new THREE.MeshStandardMaterial({
                color: 0x000000
            })
                
            let text_mesh = new THREE.Mesh(geom, text_material)
            let position = new THREE.Vector3(track_mesh.position.x + 14, track_mesh.position.y, track_mesh.position.z + 5)

            text_mesh.position.copy(position)
            text_mesh.rotateX(Math.PI / -2)

            this.scene.add(text_mesh)
            this.scene.add(track_mesh)
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
        if (this.camera && this.renderer) {
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
        }
    }
}