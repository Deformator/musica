import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';

import { MusicProvider } from '../../providers/music/music'
import { SocialSharing } from '@ionic-native/social-sharing';

import { MusicPlayerPage } from '../../pages/music-player/music-player'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public allMusic = []

  constructor(

    private socialSharing: SocialSharing,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    public musicProvider: MusicProvider,
    public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    let allMusicLoadingController = this.loadingController.create({
      content: 'Please wait a moment'
    })
    this.musicProvider.getMusic().subscribe((data) => {
      allMusicLoadingController.dismiss()
      this.allMusic = data
      console.log()
    })
  }

  goToMusicPlayer(music){
    this.navCtrl.push(MusicPlayerPage, {
      music: music
    })
  }

  doRefresh(refresher) {
    this.musicProvider.getMusic().subscribe((data) => {
      this.allMusic.unshift(data[0]);
      refresher.complete()
    })
  }

  shareSong(music){
    let shareActionSheet = this.actionSheetController.create({
      title: 'Share your music',
      buttons: [
        {
          text: 'Share on Facebook',
          icon: 'logo-facebook',
          handler: ()=> {
            this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url).then(() => {
              // Success!
            }).catch(() => {
              // Error!
            });
          }
        },
        {
          text: 'Share on Twitter',
          icon: 'logo-twitter',
          handler: ()=> {
            this.socialSharing.shareViaTwitter(music.name, music.image, music.music_url).then(() => {
              // Success!
            }).catch(() => {
              // Error!
            });
          }
        },
        {

          text: 'Share', 
          icon: 'share',
          handler: ()=> {
            this.socialSharing.share(music.name, '', music.image, music.music_url).then(() => {
              // Success!
            }).catch(() => {
             
            });
          }
        },
        {
          text: 'Cancel',
          role: 'destructive'
        }
      ]
    })
    shareActionSheet.present();
  }
}