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

    private allowDrop = (event) => {
        event.preventDefault();
        event.currentTarget.style.background = '#7f8082';
    }

    private drop = (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        const element = document.querySelector(`#${data}`);
        event.currentTarget.style.background = 'white'
        try {
            event.target.appendChild(element);
        } catch (error) {
            console.warn("you can't move the item to the same place")
        }
    }

    private dragStart = (event) => {
        event.dataTransfer.setData("text/plain", event.target.id)
    }

    private createDrop() {
        var element = document.createElement('div')
        element.setAttribute('class', 'dropzone')
        element.ondragover = this.allowDrop
        element.ondrop = this.drop
        document.getElementById('board').appendChild(element)
    }

    private createRock(name: string) {
        var element = document.createElement('img')
        element.setAttribute('src', '/assets/' + name + '.svg')
        element.setAttribute('id', name)
        element.setAttribute('draggable', 'true')
        element.ondragstart = this.dragStart
        document.getElementById('rocks').appendChild(element)
    }
}