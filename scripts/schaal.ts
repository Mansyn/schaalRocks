export class Schaal {

    name: string;

    constructor(_name: string) {
        this.name = _name;
    }

    myName() {
        return this.name;
    }


    onDragStart(event) {
        event
            .dataTransfer
            .setData('text/plain', event.target.id);

        event
            .currentTarget
            .style
            .opacity = '0.4';
    }

    onDragOver(event) {
        event.preventDefault();
    }

    onDrop(event) {
        const id = event
            .dataTransfer
            .getData('text');

        const draggableElement = document.getElementById(id);
        const dropzone = event.target;

        dropzone.appendChild(draggableElement);

        event
            .dataTransfer
            .clearData();
    }
}