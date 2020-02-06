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
    textureSide: THREE.Texture
    textureEnd: THREE.Texture

    targetList: THREE.Mesh[]
    raycaster: THREE.Raycaster
    mouse: THREE.Vector2

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

        document.addEventListener('mousedown', this.onDocumentMouseDown, false)
    }

    public load() {
        const that = this

        this.loadingManager = new THREE.LoadingManager()
        this.loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
            console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
        }
        this.loadingManager.onLoad = function () {
            console.log('Loading complete')

            const loadingScreen = document.getElementById('loading-screen')
            loadingScreen.classList.add('fade-out')
            loadingScreen.addEventListener('transitionend', function (event) {
                (helpers.castElem(event.target)).remove()
            })

            that.init()
        }
        this.loadingManager.onError = function (url) {
            console.log('There was an error loading ' + url)
        }

        const fontLoader = new THREE.FontLoader(this.loadingManager)
        const textureLoader = new THREE.TextureLoader(this.loadingManager)
        fontLoader.load('assets/fonts/Reznor_Broken.json', function (response) {
            that.font = response
        })
        textureLoader.load('assets/img/textures/tds.jpg', function (response) {
            that.textureSide = response
        })
        textureLoader.load('assets/img/textures/tds-top.jpg', function (response) {
            that.textureEnd = response
        })
    }

    private init() {
        this.mixers = []
        this.targetList = []
        this.clock = new THREE.Clock()
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()

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
            if (document.getElementById('loading') != null) {
                let elem = document.getElementById('loading')
                elem.parentNode.removeChild(elem)
            }
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
        let light = new THREE.DirectionalLight(0xA22825, 4)
        light.position.set(0, 10, 0);
        light.target.position.set(5, 0, -5)
        //this.scene.add(light)
        //this.scene.add(light.target)

        let light2 = new THREE.AmbientLight(0x000000, 2)
        this.scene.add(light2)
    }

    private loadModels() {
        const trackList = loader.trackList()
        let box_geometry = new THREE.BoxBufferGeometry(1, 1, 1)
        box_geometry.translate(0, 0.5, 0)
        const box_materials = [
            new THREE.MeshBasicMaterial({ map: this.textureSide }),
            new THREE.MeshBasicMaterial({ map: this.textureSide }),
            new THREE.MeshBasicMaterial({ map: this.textureEnd }),
            new THREE.MeshBasicMaterial({ map: this.textureEnd }),
            new THREE.MeshBasicMaterial({ map: this.textureSide }),
            new THREE.MeshBasicMaterial({ map: this.textureSide })
        ]

        for (var i = 0; i < trackList.length; i++) {

            let track_mesh = new THREE.Mesh(box_geometry, box_materials)
            track_mesh.name = trackList[i].name
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
                color: 0x0E1C1C
            })
                
            let text_mesh = new THREE.Mesh(geom, text_material)
            let position = new THREE.Vector3(track_mesh.position.x + 14, track_mesh.position.y, track_mesh.position.z + 5)

            text_mesh.position.copy(position)
            text_mesh.rotateX(Math.PI / -2)

            this.scene.add(text_mesh)
            this.scene.add(track_mesh)
            this.targetList.push(track_mesh)
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

    private onDocumentMouseDown = (event: MouseEvent) => {
        // the following line would stop any other event handler from firing
        // (such as the mouse's TrackballControls)
        // event.preventDefault();

        console.log('Click.')

        // update the mouse variable
        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1
        this.mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1

        // find intersections
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // create an array containing all objects in the scene with which the ray intersects
        var intersects = this.raycaster.intersectObjects(this.targetList, true)

        // if there is one (or more) intersections
        if (intersects.length > 0) {
            console.log('Hit @ ' + intersects[0].object.name)
            
        }
    }
}