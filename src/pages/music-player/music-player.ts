import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';


@Component({
  selector: 'page-music-player',
  templateUrl: 'music-player.html',
})
export class MusicPlayerPage {

  public music = {};
  public mediaObject: MediaObject = null;
  public isMusicPause = false;

  constructor(
    private media: Media,
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.music = this.navParams.get('music')
  }

  ionViewDidLoad() {

  }

  ionViewWillLeave(){
    this.stopMusic()
  }

  playMusic(){
    if(this.mediaObject === null){
      this.mediaObject = this.media.create(this.music['music_url'])
      this.mediaObject.play()
    } else {
      if(this.isMusicPause === true){
        this.mediaObject.play()
        this.isMusicPause = false
      }
    }
  }

  pauseMusic(){
    if(this.mediaObject !== null){
      this.mediaObject.pause()
      this.isMusicPause = true
    }
  }

  stopMusic(){
    if(this.mediaObject !== null){
      this.mediaObject.stop()
      this.mediaObject.release()
      this.mediaObject = null;
    }
  }

}
