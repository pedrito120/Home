import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {Facebook} from '@ionic-native/facebook/ngx'
import { from } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  constructor(private nativeS:NativeStorage,private facebook:Facebook,private router : Router,private alert:AlertController,private loading:LoadingController) { }

  ngOnInit() {
  }
  async load(loading){
    return await loading.present();
  }
  async faceboolLogin(){
    let permissions = new Array<String>();
    const loading = await this.loading.create({
      message:'please wait'
    });
    this.load(loading);
    permissions=['public_profile','email'];


    
  }
}
