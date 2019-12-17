import Utils from './lib/utils'
import Rock from './lib/rock'

export class Schaal {

    name: string
    rocks: Rock[]
    selectedRocks: Rock[]

    constructor(_name: string) {
        this.name = _name
        this.rocks = []
        this.selectedRocks = []
    }

    public myName() {
        return this.name
    }

    public setup() {
        this.createDrops()
        this.createRock('rocket')
        this.createRock('rockpile')
        this.createRock('blood')
        this.createRock('blood-drop')
    }

    private dragEnter = (evt: DragEvent) => {
        if (Utils.isDropZone(evt.target)) {
            let dropzone = Utils.castElem(evt.target)
            dropzone.style.background = 'rgba(24, 23, 23, 0.9)'
        } else if (Utils.isRockZone(evt.target)) {

        }
    }

    private dragLeave = (evt: DragEvent) => {
        if (Utils.isDropZone(evt.target)) {
            let dropzone = Utils.castElem(evt.target)
            dropzone.style.background = 'rgba(24, 23, 23, 0.65)'
        } else if (Utils.isRockZone(evt.target)) {

        }
    }

    private dragOver = (evt: DragEvent) => {
        evt.preventDefault()
    }

    private drop = (evt: DragEvent) => {
        evt.preventDefault();
        if (Utils.isDropZone(evt.target)) {
            let dropzone = Utils.castElem(evt.target)
            const data = evt.dataTransfer.getData('text/plain')
            const rockQuery = document.querySelector(`#${data}`)
            let rockElem = Utils.castImg(rockQuery)
            let rock = this.rocks.filter(r => r.name == rockQuery.id)[0]
            rockElem.style.opacity = '1'
            dropzone.style.background = 'rgba(24, 23, 23, 0.65)'
            if (!this.selectedRocks.filter(r => r.name == rock.name).length) {
                this.selectedRocks.push(rock)
                dropzone.appendChild(rockElem)
            }
        } else if (Utils.isRockZone(evt.target)) {
            let rockzone = Utils.castElem(evt.target)
            const data = evt.dataTransfer.getData('text/plain')
            const rockQuery = document.querySelector(`#${data}`)
            let rockElem = Utils.castImg(rockQuery)
            let rock = this.rocks.filter(r => r.name == rockQuery.id)[0]
            rockElem.style.opacity = '1'
            if (this.selectedRocks.filter(r => r.name == rock.name).length) {
                this.selectedRocks.splice(this.selectedRocks.indexOf(rock), 1)
                rockzone.appendChild(rockElem)
            }
        }
    }

    private dragStart = (evt: DragEvent) => {
        if (Utils.isImg(evt.target)) {
            let img = Utils.castImg(evt.target)
            img.style.opacity = '0.4'
            evt.dataTransfer.setData('text/plain', img.id)
        }
    }

    private dragEnd = (evt: DragEvent) => {
        if (Utils.isImg(evt.target)) {
            let img = Utils.castImg(evt.target)
            img.style.opacity = '1'
        }
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
        this.rocks.push(new Rock(name))
        var rock = document.createElement('img')
        rock.setAttribute('src', '/assets/' + name + '.svg')
        rock.setAttribute('id', name)
        rock.setAttribute('draggable', 'true')
        rock.setAttribute('class', 'rock')
        rock.ondragstart = this.dragStart
        rock.ondragend = this.dragEnd
        document.getElementById('rocks').appendChild(rock)
    }
}