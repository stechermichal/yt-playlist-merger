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
  getPlaylists(pageToken: string = '') {
    this.youtubeService
      .getPlaylists(this.channelId, pageToken)
      .subscribe((response: any) => {
        for (const item of response.items) {
          this.getPlaylistItems(item.id);
        }

        // If there's another page, fetch it
        if (response.nextPageToken) {
          this.getPlaylists(response.nextPageToken);
        }
      });
  }

  getPlaylistItems(playlistId: string, pageToken: string = '') {
    this.youtubeService
      .getPlaylistItems(playlistId, pageToken)
      .subscribe((response: any) => {
        for (const video of response.items) {
          this.videos.push(video.snippet.resourceId.videoId);
        }

        // If there's another page, fetch it
        if (response.nextPageToken) {
          this.getPlaylistItems(playlistId, response.nextPageToken);
        }
      });
  }
}
