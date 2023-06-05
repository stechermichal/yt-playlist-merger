import { Component } from '@angular/core';
import { YoutubeService } from './youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'yt-playlist-merger';
  channelId = '';
  videos: string[] = [];

  constructor(private youtubeService: YoutubeService) {}

  getPlaylists() {
    this.youtubeService
      .getPlaylists(this.channelId)
      .subscribe((response: any) => {
        for (const item of response.items) {
          this.youtubeService
            .getPlaylistItems(item.id)
            .subscribe((response: any) => {
              for (const video of response.items) {
                this.videos.push(video.snippet.resourceId.videoId);
              }
            });
        }
      });
  }
}
