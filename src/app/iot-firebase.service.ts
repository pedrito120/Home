import { Injectable } from '@angular/core';
import { FirebaseDatabase } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { database } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IotFirebaseService {
    object:any
  constructor(private hostIot:AngularFireDatabase) { }

  updateStatus(value:any,nombre:any){
    return this.hostIot.object('/house').update({'foco1':value});
  }
  updateStatus2(value:any,nombre:any){
    return this.hostIot.object(`/house/${nombre}`).set(value);
  }
  updateStatus3(value:any,id:any){
    console.log(value , "  ", id)
    return this.hostIot.object(`/house/${id}`).update({'estado':value});
  }
  getStatus():Observable<any>{
    return this.hostIot.list('house').valueChanges()
  }
}
