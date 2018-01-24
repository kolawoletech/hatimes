import { YtProvider } from './../../providers/yt/yt';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavParams, Platform } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {
  videos: Observable<any[]>;

  constructor(private navParams: NavParams, private ytProvider: YtProvider, private youtube: YoutubeVideoPlayer, private socialSharing: SocialSharing,private plt: Platform) {
    let listId = this.navParams.get('id');
    this.videos = this.ytProvider.getListVideos(listId);
  }

  openVideo(video) {
    if (this.plt.is('cordova')) {
      this.youtube.openVideo(video.snippet.resourceId.videoId);
    } else {
      window.open('https://www.youtube.com/watch?v=' + video.snippet.resourceId.videoId);
    }
  }

  share(video) {
    if (this.plt.is('cordova')) {
      this.socialSharing.share("Share" + video.snippet.description, video.snippet.thumbnails.standard.url,'https://www.youtube.com/watch?v=' + video.snippet.resourceId.videoId);
    } else {
      this.socialSharing.share("Share" + video.id, video.title,video.img);
    }
  }
}