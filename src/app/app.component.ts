import { Component, AfterViewInit } from '@angular/core'
import { Howl, Howler } from 'howler'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  sound: Howl

  ngAfterViewInit() {
    this.sound = new Howl({
      src: ['audio/80s_vibe.webm']
    })
  }

  play() {
    this.sound.play()
  }
}
