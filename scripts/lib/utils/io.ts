import track from "../models/track"

export default class IO {
    static trackList() {
        return [
            new track('rock', '/assets/audio/rock.flac'),
            new track('blood-drop', '/assets/audio/blood-drop.flac'),
            new track('blood', '/assets/audio/blood.flac'),
            new track('syringe', '/assets/audio/syringe.flac')
        ]
    }
}