

export default class player {

    tone: any
    name: string

    constructor(tone, _name) {
        this.name = _name
        this.tone = tone
        this.tone.url = '../../assets/audio/'+name+'.flac'
        this.tone.loop = true
    }

    play() {
        if (this.tone.state == 'stopped') {
            this.tone.start()
        }
    }

    stop() {
        if (this.tone.state == 'started') {
            this.tone.stop()
        }
    }

}