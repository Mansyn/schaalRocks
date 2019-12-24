import { Howl } from 'howler'

export default class player {

    track: any
    name: string

    constructor(_name) {
        this.name = _name
        this.track = new Howl({
            src: ['../../assets/audio/' + _name + '.flac'],
            autoplay: true,
            loop: true,
            onend: function () {
                //console.log('Finished!');
            }
        })
    }

    play() {
        this.track.play()
    }

    stop() {
        this.track.stop()
    }

}