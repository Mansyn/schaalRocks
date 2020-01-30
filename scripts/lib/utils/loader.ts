import track from "../models/track"

export default class loader {
    static trackList() {
        return [
            new track('ambient loop 1', '/assets/audio/THTF ambient loop 1.flac'),
            new track('ambient loop 2', '/assets/audio/THTF ambient loop 2.flac'),
            new track('bass 1', '/assets/audio/THTF bass ch 1.flac'),
            new track('bass loop', '/assets/audio/THTF bass END loop.flac')
        ]
    }
}