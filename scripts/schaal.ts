export class Schaal {

    name: string;

    constructor(_name: string) {
        this.name = _name;
    }

    public myName() {
        return this.name;
    }

    public loadRocks() {
        this.createRock('rocket');
        this.createRock('blood');
        this.createRock('blood-drop');
    }

    draginit() {

    }

    private createRock(name: string) {
        var element = document.createElement('img');
        element.setAttribute('src', '/assets/' + name + '.svg');
        element.setAttribute('class', 'draggable');
        document.getElementById('rocks').appendChild(element);
    }
}