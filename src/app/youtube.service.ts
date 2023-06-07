import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) {}

  getPlaylists(channelId: string, pageToken: string = '') {
    const apiKey = environment.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&key=${apiKey}&pageToken=${pageToken}`;
    return this.http.get(url);
  }

  getPlaylistItems(playlistId: string, pageToken: string = '') {
    const apiKey = environment.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&pageToken=${pageToken}`;
    return this.http.get(url);
  }
}
