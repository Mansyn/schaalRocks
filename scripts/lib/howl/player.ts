import { Howl } from 'howler'

export default class player {

    track: any
    id: string

    constructor(_id, _path) {
        this.id = _id
        this.track = new Howl({
            src: [_path],
            loop: false,
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