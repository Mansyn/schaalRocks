export default class Utils {
    static isElem(i: EventTarget) { return i instanceof HTMLElement }
    static isDropZone(i: EventTarget) { return i instanceof HTMLElement && i.className == 'dropzone' }
    static castElem(i: EventTarget) { return i as HTMLElement }
    static isImg(i: EventTarget) { return i instanceof HTMLImageElement }
    static castImg(i: EventTarget) { return i as HTMLImageElement }
}