export class Schaal {

    name: string
    selectedRock: any

    constructor(_name: string) {
        this.name = _name
    }

    public myName() {
        return this.name
    }

    public setup() {
        this.createDrop()
        this.createRock('rocket')
        this.createRock('blood')
        this.createRock('blood-drop')
    }

    private dragenter = (event) => {
        if (event.target.className == "dropzone") {
            event.currentTarget.style.background = 'rgba(24, 23, 23, 0.9)'
        }
    }

    private dragleave = (event) => {
        if (event.target.className == "dropzone") {
            event.currentTarget.style.background = 'rgba(24, 23, 23, 0.65)'
        }
    }

    private drop = (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain')
        const element = document.querySelector(`#${data}`)
        event.currentTarget.style.background = 'rgba(24, 23, 23, 0.65)'
        try {
            event.target.appendChild(element)
        } catch (error) {
            console.warn("you can't move the item to the same place")
        }
    }

    private dragStart = (event) => {
        event.target.style.opacity = '0.4'
        event.dataTransfer.setData('text/plain', event.target.id)
    }

    private dragEnd = (event) => {
        event.target.style.opacity = '1'
    }

    private createDrop() {
        var zone = document.createElement('div')
        zone.setAttribute('class', 'dropzone')
        zone.ondragenter = this.dragenter
        zone.ondragleave = this.dragleave
        zone.ondrop = this.drop
        document.getElementById('board').appendChild(zone)
    }

    private createRock(name: string) {
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