import utils from './lib/utils'
import rock from './lib/rock'
import player from './lib/player'

export class Schaal {

    name: string
    rocks: rock[]
    selectedRocks: rock[]

    players: player[]

    constructor(_name: string) {
        this.name = _name
        this.rocks = []
        this.selectedRocks = []
        this.players = []
    }

    public myName() {
        return this.name
    }

    public setup() {
        this.createDrops()
        this.createRock('syringe')
        this.createRock('rock')
        this.createRock('blood')
        this.createRock('blood-drop')
    }

    private dragEnter = (evt: DragEvent) => {
        if (utils.isDropZone(evt.target)) {
            let dropzone = utils.castElem(evt.target)
            dropzone.style.background = 'rgba(24, 23, 23, 0.9)'
        } else if (utils.isRockZone(evt.target)) {

        }
    }

    private dragLeave = (evt: DragEvent) => {
        if (utils.isDropZone(evt.target)) {
            let dropzone = utils.castElem(evt.target)
            dropzone.style.background = 'rgba(24, 23, 23, 0.65)'
        } else if (utils.isRockZone(evt.target)) {

        }
    }

    private dragOver = (evt: DragEvent) => {
        evt.preventDefault()
    }

    private drop = (evt: DragEvent) => {
        evt.preventDefault();
        if (utils.isDropZone(evt.target)) {
            let dropzone = utils.castElem(evt.target)
            const data = evt.dataTransfer.getData('text/plain')
            const rockQuery = document.querySelector(`#${data}`)
            let rockElem = utils.castImg(rockQuery)
            let rock = this.rocks.filter(r => r.name == rockQuery.id)[0]
            rockElem.style.opacity = '1'
            dropzone.style.background = 'rgba(24, 23, 23, 0.65)'
            if (!this.selectedRocks.filter(r => r.name == rock.name).length) {
                this.selectedRocks.push(rock)
                dropzone.appendChild(rockElem)
                this.startPlayer(rock.name)
            }
        } else if (utils.isRockZone(evt.target)) {
            let rockzone = utils.castElem(evt.target)
            const data = evt.dataTransfer.getData('text/plain')
            const rockQuery = document.querySelector(`#${data}`)
            let rockElem = utils.castImg(rockQuery)
            let rock = this.rocks.filter(r => r.name == rockQuery.id)[0]
            rockElem.style.opacity = '1'
            if (this.selectedRocks.filter(r => r.name == rock.name).length) {
                this.selectedRocks.splice(this.selectedRocks.indexOf(rock), 1)
                rockzone.appendChild(rockElem)
                this.stopPlayer(rock)
            }
        }
    }

    private dragStart = (evt: DragEvent) => {
        if (utils.isImg(evt.target)) {
            let img = utils.castImg(evt.target)
            img.style.opacity = '0.4'
            evt.dataTransfer.setData('text/plain', img.id)
        }
    }

    private clickRock = (evt: Event) => {
        if (utils.isImg(evt.target)) {
            let img = utils.castImg(evt.target)
            let rock = this.rocks.filter(r => r.name == img.id)[0]
            img.style.opacity = '1'
            if (img.parentElement.id == 'rocks') {
                let dropzone = utils.castElem(document.querySelector(`#board .dropzone`))
                dropzone.style.background = 'rgba(24, 23, 23, 0.65)'
                if (!this.selectedRocks.filter(r => r.name == rock.name).length) {
                    this.selectedRocks.push(rock)
                    dropzone.appendChild(img)
                    this.startPlayer(rock.name)
                }
            } else {
                let rockzone = utils.castElem(document.querySelector(`#rocks`))
                if (this.selectedRocks.filter(r => r.name == rock.name).length) {
                    this.selectedRocks.splice(this.selectedRocks.indexOf(rock), 1)
                    rockzone.appendChild(img)
                    this.stopPlayer(rock)
                }
            }
        }
    }

    private dragEnd = (evt: DragEvent) => {
        if (utils.isImg(evt.target)) {
            let img = utils.castImg(evt.target)
            img.style.opacity = '1'
        }
    }

    private startPlayer(name) {
        let _player = new player(name)
        this.players.push(_player)
        _player.play()
    }

    private stopPlayer(rock) {
        let _player = this.players.find((p) => p.name == rock.name)
        this.players.splice(this.players.indexOf(_player), 1)
        _player.stop()
    }

    private createDrops() {
        let dropzone = document.createElement('div')
        dropzone.setAttribute('class', 'dropzone')
        dropzone.ondragenter = this.dragEnter
        dropzone.ondragleave = this.dragLeave
        dropzone.ondragover = this.dragOver
        dropzone.ondrop = this.drop
        document.getElementById('board').appendChild(dropzone)

        let rockzone = document.getElementById('rocks')
        rockzone.ondragenter = this.dragEnter
        rockzone.ondragleave = this.dragLeave
        rockzone.ondragover = this.dragOver
        rockzone.ondrop = this.drop
    }

    private createRock(name: string) {
        this.rocks.push(new rock(name))
        let img = document.createElement('img')
        img.setAttribute('src', '/assets/img/' + name + '.svg')
        img.setAttribute('id', name)
        img.setAttribute('draggable', 'true')
        img.setAttribute('class', 'rock')
        img.ondragstart = this.dragStart
        img.onclick = this.clickRock
        img.ondragend = this.dragEnd
        document.getElementById('rocks').appendChild(img)
    }
}