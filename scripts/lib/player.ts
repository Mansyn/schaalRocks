import * as Tone from 'tone';

export default class player {

    synth: any

    constructor() {
        this.synth = new Tone.FMSynth().toMaster()
    }

    public rocket() { 
        this.synth.triggerAttackRelease('C4', '4n', '8n')
        this.synth.triggerAttackRelease('E4', '8n', Tone.Time('4n') + Tone.Time('8n'))
        this.synth.triggerAttackRelease('G4', '16n', '2n')
        this.synth.triggerAttackRelease('B4', '16n', Tone.Time('2n') + Tone.Time('8t'))
        this.synth.triggerAttackRelease('G4', '16', Tone.Time('2n') + Tone.Time('8t') * 2)
        this.synth.triggerAttackRelease('E4', '2n', '0:3')
    }

}