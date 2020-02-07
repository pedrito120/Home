import { Component, OnInit } from '@angular/core';
import { IotFirebaseService } from '../iot-firebase.service';
import { Focos } from 'src/app/focos';
import { analytics } from 'firebase';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  livingroom:any
  diningroom:any
  kitchen:any
  value:any
  foco:any
  data:Focos[]=[];
  constructor(private houseIot: IotFirebaseService) {
    
    this.houseIot.getStatus()
    .subscribe((res)=>{
      this.data=res;
      console.log(this.data)
      console.log(this.value=res);
      if(this.value == "on"){
        this.livingroom =  true;
      }
    })

  }
  
  getValue(value) {
    console.log(value)
  }
  updateStatus(e,id) {
    console.log(e.detail.checked)
    var con;
    if(e.detail.checked===true){
      con=true
    }else{
      con=false
    }
      this.houseIot.updateStatus3(con,id).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err);
      })
  }
  updateStatus2(foco,nombre) {  
    const value = foco ? "on" : "off"
    this.houseIot.updateStatus2(value,nombre).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err);
    })
  
}
    ngOnInit() {
    }
  }
