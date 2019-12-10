import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User {
id?: string,
name?: string,
bio?: string,
company?: string,
email?: string,
role?: string,
contacts?: any,
cards?: any
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;

  user:string;

  constructor() { }

  setUser(user:string) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
