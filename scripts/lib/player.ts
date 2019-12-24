
export default class player {

    tone: any
    name: string

    constructor(tone, _name) {
        this.name = _name
        this.tone = tone
    }

    play() {
        this.tone.get(this.name).start()
    }

    stop() {
        this.tone.get(this.name).stop()
    }

}