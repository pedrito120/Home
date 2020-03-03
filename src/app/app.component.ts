import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

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
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private onesignal: OneSignal,
    private alertCtr: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(this.platform.is('cordova')){
        this.setupPush();
      }
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
    this.onesignal.handleNotificationReceived().subscribe((data:any)=>{
      let msg = data.playload.body;
      let title = data.playload.title;
      let addtionalData = data.playload.addtionalData;
      this.showAlert(title,msg,addtionalData);
    });
    this.onesignal.handleNotificationOpened().subscribe((data:any)=>{
      let addtionalData = data.notification.playload.additionalData;
      this.showAlert('Notification Opened','You already read before',addtionalData);
    })
    this.onesignal.endInit();
  }
}
