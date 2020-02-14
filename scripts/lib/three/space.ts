import * as THREE from 'three'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls'
import { clicked } from 'clicked'

import { helpers } from '../utils/helpers'
import { COLORS, THREE_COLORS, TRACK } from '../utils/constants'
import { player } from '../howl/player'
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

    existingPositions: THREE.Vector3[]
    trackList: Itrack[]
    targetList: THREE.Mesh[]
    raycaster: THREE.Raycaster
    mouse: THREE.Vector2

    fov: number
    aspect: number
    near: number
    far: number

    constructor(_db: TrackDatabase) {
        this.dom()
        this.db = _db
        this.existingPositions = []

        window.addEventListener('resize', this.onWindowResize)

        document.addEventListener('click', this.onTap, false)
        document.addEventListener('touchstart', this.onMobileTap, false)
    }

    private dom(): void {
        this.container = helpers.castDivElem(document.createElement('div'))
        this.container.setAttribute('id', 'scene-container')
        this.container.setAttribute('class', 'dropzone')
        this.container.setAttribute('style', 'min-height:400px')
        document.getElementById('board').appendChild(this.container)
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
    }

    private init(): void {
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
        let light = new THREE.DirectionalLight(COLORS.WHITE)
        light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z)
        light.castShadow = true
        light.shadow.camera.near = this.camera.near
        light.shadow.camera.far = this.camera.far
        light.shadow.mapSize.width = 2000
        light.shadow.mapSize.height = 2000

        this.scene.add(light)
    }

    private loadModels(): void {
        let box_geometry = new THREE.BoxBufferGeometry(1, 1, 1)
        box_geometry.translate(0, 0.5, 0)
        const track_material = new THREE.MeshPhongMaterial({ color: COLORS.RED2, specular: COLORS.BLACK, shininess: 30 })

        for (let i = 0; i < this.trackList.length; i++) {
            let track_mesh = new THREE.Mesh(box_geometry, track_material)
            track_mesh.name = this.trackList[i].path
            track_mesh.position.copy(this.getPosition())
            this.existingPositions.push(track_mesh.position)

            track_mesh.scale.x = TRACK.WIDTH
            track_mesh.scale.y = this.trackList[i].file.size / 5000
            track_mesh.scale.z = TRACK.WIDTH
            track_mesh.updateMatrix()
            track_mesh.matrixAutoUpdate = false

            const geom = new THREE.TextGeometry(this.trackList[i].name.toUpperCase(), {
                font: this.font,
                size: 10,
                height: 1,
                curveSegments: 30
            })

            const text_material = new THREE.MeshStandardMaterial({
                color: COLORS.BLACK
            })
                
            let text_mesh = new THREE.Mesh(geom, text_material)
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

        this.renderer.gammaFactor = 2.2
        this.renderer.outputEncoding = THREE.GammaEncoding

        this.renderer.physicallyCorrectLights = true

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
        this.handleTapEvent(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
    }

    private onTap = (e: MouseEvent) => {
        this.handleTapEvent(e.offsetX, e.offsetY)
    }

    private handleTapEvent(x: number, y: number) {
        this.mouse.x = (x / this.renderer.domElement.offsetWidth) * 2 - 1
        this.mouse.y = -(y / this.renderer.domElement.offsetHeight) * 2 + 1

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.targetList, true)

        if (intersects.length > 0) {
            let _track = this.trackList.find((p) => p.path == intersects[0].object.name)
            let _player = new player(_track, intersects[0])
            _player.play()
        }
    }
}