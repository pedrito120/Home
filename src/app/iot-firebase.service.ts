import { Injectable } from '@angular/core';
import { FirebaseDatabase } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { database } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IotFirebaseService {
  object: any
  array: any;
  values: any;
  constructor(private houseIoT: AngularFireDatabase) { }

  updateStatus(stateValue: any , idDocument: any, idHistory: any, hourMinute: any, timeSave: any): Promise<any> {
    this.houseIoT.object(`/house/${idDocument}`).update({estado : stateValue});
    return this.houseIoT.object(`/house/${idDocument}/historial/${idHistory}`).update({referencia: hourMinute, estado : stateValue, tiempo : timeSave});
  }
  insertNewDay(idDocument: any, newIdHistory: any, date: string) {
    this.houseIoT.object(`/house/${idDocument}/historial/${newIdHistory}`).update({fecha: date});
  }
  getStatus(): Observable<any> {
    return this.houseIoT.list('house').valueChanges();
  }
}
