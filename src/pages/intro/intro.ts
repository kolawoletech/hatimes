import { HomePage } from './../home/home';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  video_id: any;
  constructor(public sanitizer: DomSanitizer, public youtube: YoutubeVideoPlayer,public navCtrl: NavController, public navParams: NavParams) {
    this.video_id = 'a1NW_KRPORM';
  }

  goToHome(){
    this.navCtrl.setRoot(HomePage);
  }
  watch_on_youtube( video_id ) {
    this.youtube.openVideo( video_id );
  }

  updateVideoUrl(id: string) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data, so
    // that it's easier to check if the value is safe.
    let dangerousVideoUrl = 'https://www.youtube.com/embed/' + id + '?rel=0&showinfo=0';
    return this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
}
}
