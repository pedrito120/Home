import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title:'user',
      url:'/user',
      icon:'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private onesignal: OneSignal,
    private alertCtr: AlertController,
    private nativeStorage : NativeStorage,
    private router : Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.nativeStorage.getItem("facebook_user").then(() => {
        this.router.navigate(['/user']);
        this.splashScreen.hide();
      }, err => {
        this.router.navigate(['/home']);
        this.splashScreen.hide();
      });
      this.statusBar.styleDefault();
    });
    
  }
  async showAlert(title, msg, task) {
    const alert = await this.alertCtr.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {

          }
        }
      ]
    })
    alert.present();
  }
  setupPush() {
    this.onesignal.startInit('526bf95a-3d9b-43cd-bbba-8eb5216b3521', '747397293850');
    this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.None);
    this.onesignal.handleNotificationReceived().subscribe((data: any) => {
      let msg = data.playload.body;
      let title = data.playload.title;
      let addtionalData = data.playload.addtionalData;
      this.showAlert(title, msg, addtionalData);
    });
    this.onesignal.handleNotificationOpened().subscribe((data: any) => {
      let addtionalData = data.notification.playload.additionalData;
      this.showAlert('Notification Opened', 'You already read before', addtionalData);
    })
    this.onesignal.endInit();
  }
}
