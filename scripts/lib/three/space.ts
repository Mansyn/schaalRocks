import * as THREE from 'three'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls'

import { helpers } from '../utils/helpers'
import { COLORS, THREE_COLORS, TRACK, THREE_SETTINGS } from '../utils/constants'
import { HowlPlayer } from '../howl/player'
import { threeUtils } from '../utils/three'
import { TrackDatabase } from '../services/db'

export class ThreeSpace {

    container: HTMLDivElement
    
    db: TrackDatabase
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
    ground: THREE.Texture

    existingPositions: THREE.Vector3[]
    trackList: Itrack[]
    targetList: THREE.Mesh[]
    raycaster: THREE.Raycaster

    howlers: HowlPlayer[]

    constructor(_db: TrackDatabase) {
        this.container = helpers.castDivElem(document.getElementsByClassName('scene-container')[0])
        this.db = _db
        this.existingPositions = []
        this.howlers = []

        window.addEventListener('resize', this.onWindowResize)

        document.addEventListener('click', this.onTap, false)
        document.addEventListener('touchstart', this.onMobileTap, false)
    }

    public load(): void {
        const that = this

        this.loadingManager = new THREE.LoadingManager()
        this.loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
            //console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
        }
        this.loadingManager.onLoad = function () {
            //console.log('Loading complete')

            that.db.tracks.toArray()
                .then(tracks => {
                    that.trackList = tracks

                    const loadingScreen = document.getElementById('loading-screen')
                    loadingScreen.classList.add('fade-out')
                    loadingScreen.addEventListener('transitionend', function (event) {
                        (helpers.castElem(event.target)).remove()
                    })

                    that.init()
                })
        }
        this.loadingManager.onError = function (url) {
            //console.log('There was an error loading ' + url)
        }

        const fontLoader = new THREE.FontLoader(this.loadingManager)
        fontLoader.load('assets/fonts/Reznor_Broken.json', function (response) {
            that.font = response
        })

        const textureLoader = new THREE.TextureLoader(this.loadingManager)
        textureLoader.load('assets/img/textures/ground-tile.jpg', function (texture) {
            that.ground = texture
        })
    }

    private init(): void {
        this.mixers = []
        this.targetList = []
        this.clock = new THREE.Clock()
        this.raycaster = new THREE.Raycaster()

        this.scene = new THREE.Scene()
        this.scene.background = THREE_COLORS.RED
        this.scene.fog = new THREE.FogExp2(COLORS.RED, 0.001)
        
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

    private createCamera(): void {
        this.camera = new THREE.PerspectiveCamera(60, this.container.clientWidth / this.container.clientHeight, 1, 2000)
        this.camera.position.set(400, 200, 0)
    }

    private createControls(): void {
        this.controls = new MapControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.05

        this.controls.screenSpacePanning = false

        this.controls.minDistance = 100
        this.controls.maxDistance = 500

        this.controls.maxPolarAngle = Math.PI / 2
    }

    private createLights(): void {
        var hemiLight = new THREE.HemisphereLight(COLORS.WHITE, 0x444444)
        hemiLight.position.set(0, 200, 0)
        this.scene.add(hemiLight)

        var directionalLight = new THREE.DirectionalLight(COLORS.WHITE)
        directionalLight.position.set(0, 200, 100)

        this.scene.add(directionalLight)
    }

    private loadModels(): void {

        this.ground.wrapS = this.ground.wrapT = THREE.RepeatWrapping
        this.ground.repeat.set(18, 18)
        this.ground.anisotropy = THREE_SETTINGS.ANISOTROPY
        this.ground.encoding = THREE.sRGBEncoding

        let groundMaterial = new THREE.MeshLambertMaterial({ map: this.ground })

        let mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(20000, 20000), groundMaterial)
        mesh.position.y = 0
        mesh.rotation.x = - Math.PI / 2
        this.scene.add(mesh)

        let box_geometry = new THREE.BoxBufferGeometry(1, 1, 1)
        box_geometry.translate(0, 0.5, 0)

        for (let i = 0; i < this.trackList.length; i++) {

            let track_mesh = new THREE.Mesh(box_geometry, new THREE.MeshStandardMaterial({ color: COLORS.WHITE }))
            track_mesh.name = this.trackList[i].path
            track_mesh.position.copy(this.getPosition())
            this.existingPositions.push(track_mesh.position)

            track_mesh.scale.x = TRACK.WIDTH
            track_mesh.scale.y = this.trackList[i].file.size / 5000
            track_mesh.scale.z = TRACK.WIDTH

            track_mesh.updateMatrix()
            track_mesh.matrixAutoUpdate = false

            const text_geom = new THREE.TextGeometry(this.trackList[i].name.toUpperCase(), {
                font: this.font,
                size: 10,
                height: 1,
                curveSegments: 30
            })

            let text_mesh = new THREE.Mesh(text_geom, new THREE.LineBasicMaterial({ color: COLORS.WHITE }))
            text_mesh.name = this.trackList[i].path + '_text'
            text_mesh.position.copy(new THREE.Vector3(track_mesh.position.x + 14, track_mesh.position.y, track_mesh.position.z + 5))
            text_mesh.rotateX(Math.PI / -2)
            this.existingPositions.push(text_mesh.position)

            this.scene.add(text_mesh)
            this.scene.add(track_mesh)
            this.targetList.push(track_mesh)
        }
    }

    private getPosition(): THREE.Vector3 {
        let track_position = new THREE.Vector3()
        track_position.y = 0
        do {
            track_position.x = Math.random() * 1400 - 800
            track_position.z = Math.random() * 1400 - 800
        } while (threeUtils.hasOverlap(this.existingPositions, track_position))

        return track_position
    }

    private createRenderer(): void {
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)

        this.renderer.setPixelRatio(window.devicePixelRatio)

        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.renderer.shadowMap.enabled = true

        this.container.appendChild(this.renderer.domElement)
    }

    private update(): void {
        this.controls.update()
    }

    private render(): void {
        this.renderer.render(this.scene, this.camera)
    }

    public onWindowResize = () => {
        if (this.camera && this.renderer) {
            const parent = this.renderer.domElement.parentElement
            const width = this.renderer.domElement.clientWidth
            const height = this.renderer.domElement.clientHeight

            if (parent.clientWidth !== width || parent.clientHeight !== height) {
                this.renderer.setSize(parent.clientWidth, parent.clientHeight)
                this.camera.aspect = parent.clientWidth / parent.clientHeight
                this.camera.updateProjectionMatrix()
            }
        }
    }

    private onMobileTap = (e: TouchEvent) => {
        let vector = new THREE.Vector3(
            (e.targetTouches[0].pageX / window.innerWidth) * 2 - 1,
            -(e.targetTouches[0].pageY / window.innerHeight) * 2 + 1, 0)
        
        this.handleTapEvent(vector)
    }

    private onTap = (e: MouseEvent) => {
        let vector = new THREE.Vector3(
            (e.offsetX / this.renderer.domElement.offsetWidth) * 2 - 1,
            -(e.offsetY / this.renderer.domElement.offsetHeight) * 2 + 1, 0)
        
        this.handleTapEvent(vector)
    }

    private handleTapEvent(vector: THREE.Vector3) {
        vector.unproject(this.camera)
        this.raycaster.set(this.camera.position, vector.sub(this.camera.position).normalize())

        const intersects = this.raycaster.intersectObjects(this.targetList, true)

        if (intersects.length > 0) {
            const _track = this.trackList.find((p) => p.path == intersects[0].object.name)
            let _player = this.howlers.find((p) => p.name == _track.name)

            if (!_player) {
                const intersect_text = this.scene.getObjectByName(intersects[0].object.name + '_text')
                _player = new HowlPlayer(_track, intersects[0].object, intersect_text)
                this.howlers.push(_player)
            }
            
            var index = Math.floor(intersects[0].faceIndex / 2)
            switch (index) {
                case 0:
                case 1:
                case 4:
                case 5:
                    // play
                    _player.stop()
                    _player.play()
                    break;
                case 2:
                case 3:
                    // repeat
                    _player.toggleRepeat()
                    break;
            }

        }
    }
}