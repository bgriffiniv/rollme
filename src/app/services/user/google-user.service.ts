import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';


export interface GoogleUser {
uid: string;
email: string;
displayName: string;
photoURL: string;
emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleUserService {

  constructor() { }
}
