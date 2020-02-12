export class helpers {
    static isElem(i: EventTarget) { return i instanceof HTMLElement }
    static castElem(i: EventTarget) { return i as HTMLElement }
    static isDivElem(i: EventTarget) { return i instanceof HTMLDivElement }
    static castDivElem(i: EventTarget) { return i as HTMLDivElement }
    static isDropZone(i: EventTarget) { return i instanceof HTMLElement && i.className == 'dropzone' }
    static isRockZone(i: EventTarget) { return i instanceof HTMLElement && i.id == 'rocks' }
    static isImg(i: EventTarget) { return i instanceof HTMLImageElement }
    static castImg(i: EventTarget) { return i as HTMLImageElement }
    static isCanvas(i: EventTarget) { return i instanceof HTMLCanvasElement }
    static castCanvas(i: EventTarget) { return i as HTMLCanvasElement }
}
