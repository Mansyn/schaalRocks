import { Droppable } from '@shopify/draggable';

export class Schaal {

    name: string;
    container: NodeListOf<Element>;
    droppable: Droppable;

    constructor(_name: string) {
        this.name = _name;
        this.createImage('rocket');
        this.createImage('blood');
        this.createImage('blood-drop');
    }

    droppableOrigin: any;

    draginit() {
        this.container = document.querySelectorAll('.main-container');
        this.droppable = new Droppable(this.container, {
            draggable: '.draggable',
            dropzone: '.dropzone',
            mirror: {
                constrainDimensions: true,
            },
        });
        // --- Draggable events --- //
        this.droppable.on('drag:start', (evt) => {
            this.droppableOrigin = evt.originalSource.parentNode.dataset.dropzone;
        });

        this.droppable.on('droppable:dropped', (evt) => {
            if (this.droppableOrigin !== evt.dropzone.dataset.dropzone) {
                evt.cancel();
            }
        });
    }


    myName() {
        return this.name;
    }

    createImage(name: string) {
        var element = document.createElement('img');
        element.setAttribute('src', '/assets/' + name + '.svg');
        element.setAttribute('class', 'draggable');
        element.setAttribute('draggable', 'true');
        document.getElementById('rocks').appendChild(element);
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