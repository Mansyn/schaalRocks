import { Component, AfterViewInit } from '@angular/core'
import * as Tone from 'tone'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  
  synth:any

  constructor() {
    
  }

  ngAfterViewInit() {
    this.synth = new Tone.Synth().toMaster()
  }

  play() {
    this.synth.triggerAttackRelease("C4", "8n")
  }
}
