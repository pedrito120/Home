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
    const loading = await this.loading.create({
      message:'please wait'
    });
    this.load(loading);
    let permissions = new Array();
    permissions=["public_profile","email"];

    this.facebook.login(permissions).then(response =>{
      let userId= response.authResponse.userID;

      this.facebook.api("/me?fields=name,email",permissions)
      .then(user =>{
         user.picture = "http://graph.facebook.com/"+ userId + "/picture=type=large";
         this.nativeS.setItem('facebook_user',
         {
           name:user.name,
           email:user.email,
           picture:user.picture
         })
         .then(()=>{
           this.router.navigate(["/user"]);
           loading.dismiss();
         },error=>{
           console.log(error);
           loading.dismiss();
         })
      })

    },error=>{
      console.log(error);
      loading.dismiss();
    });

    
  }
}
