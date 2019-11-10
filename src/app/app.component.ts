import { Component, AfterViewInit } from '@angular/core'
import { Howl, Howler } from 'howler'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  sound: Howl
  playing: boolean

  constructor() {
    this.playing = false
  }

  ngAfterViewInit() {
    let that = this
    this.sound = new Howl({
      src: ['audio/80s_vibe.webm'],
      onend: function () {
        that.end()
      }
    })
  }

  play() {
    this.playing = true
    this.sound.play()
  }

  end() {
    this.playing = false
  }

  stop() {
    this.playing = false
    this.sound.stop()
  }
}
