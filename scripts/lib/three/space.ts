import * as THREE from 'three'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls'

import helpers from '../utils/helpers'
import loader from '../utils/loader'
import { COLORS, THREE_COLORS } from '../utils/constants'
import player from '../howl/player'

export class ThreeSpace {

    storage: firebase.storage.Reference
    container: HTMLDivElement
    players: player[]
    
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

    targetList: THREE.Mesh[]
    raycaster: THREE.Raycaster
    mouse: THREE.Vector2

    fov: number
    aspect: number
    near: number
    far: number

    constructor(_storage: firebase.storage.Reference) {
        this.dom()
        this.storage = _storage
        this.players = []
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
            //console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
        }
        this.loadingManager.onLoad = function () {
            //console.log('Loading complete')

            const loadingScreen = document.getElementById('loading-screen')
            loadingScreen.classList.add('fade-out')
            loadingScreen.addEventListener('transitionend', function (event) {
                (helpers.castElem(event.target)).remove()
            })

            that.init()
        }
        this.loadingManager.onError = function (url) {
            //console.log('There was an error loading ' + url)
        }

        const fontLoader = new THREE.FontLoader(this.loadingManager)
        fontLoader.load('assets/fonts/Reznor_Broken.json', function (response) {
            that.font = response
        })
    }

    private init() {
        this.mixers = []
        this.targetList = []
        this.clock = new THREE.Clock()
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()

        this.scene = new THREE.Scene()
        this.scene.background = THREE_COLORS.WHITE
        //this.scene.fog = THREE_FOG_COLORS.WHITE
        
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
        this.camera = new THREE.PerspectiveCamera(60, this.container.clientWidth / this.container.clientHeight, 1, 2000)
        this.camera.position.set(400, 200, 0)
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
        let light = new THREE.DirectionalLight(COLORS.WHITE)
        light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z)
        light.castShadow = true
        light.shadow.camera.near = this.camera.near
        light.shadow.camera.far = this.camera.far
        light.shadow.mapSize.width = 2000
        light.shadow.mapSize.height = 2000

        this.scene.add(light)
    }

    private loadModels() {
        const trackList = loader.trackList()
        let box_geometry = new THREE.BoxBufferGeometry(1, 1, 1)
        box_geometry.translate(0, 0.5, 0)
        const track_material = new THREE.MeshPhongMaterial({ color: COLORS.RED2, specular: COLORS.BLACK, shininess: 30 })

        for (var i = 0; i < trackList.length; i++) {
            let track_mesh = new THREE.Mesh(box_geometry, track_material)
            track_mesh.name = trackList[i].path
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
                color: COLORS.BLACK
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

        event.preventDefault()

        this.mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1)

        this.raycaster.setFromCamera(this.mouse, this.camera)

        const intersects = this.raycaster.intersectObjects(this.targetList)

        if (intersects.length > 0) {
            const intersect = intersects[0]

            console.log('Hit @ ' + intersect.object.name)

            this.startPlayer(intersect.object.name)
        }
    }

    private startPlayer(path: string) {
        let audioRef = this.storage.child(path)

        audioRef.getDownloadURL().then(function (url) {
            console.log(url)
        }).catch(function (error) {
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;

                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
        })

        // let _player = new player(id)
        // this.players.push(_player)
        // _player.play()
    }

    private stopPlayer(id: any) {
        let _player = this.players.find((p) => p.name == id)
        this.players.splice(this.players.indexOf(_player), 1)
        _player.stop()
    }
}