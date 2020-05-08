import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';

import { tap } from 'rxjs/operators';
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
  private userCollection: AngularFirestoreCollection<User>;
  private staticUserCollection: AngularFirestoreCollection<User>;
  //private users: Observable<User[]>;
  //private staticUsers: Observable<User[]>;

  constructor(private afs: AngularFirestore) {
    console.log('User Service constructor');

    this.userCollection = this.afs.collection<User>('users');
    this.staticUserCollection = this.afs.collection<User>('static_users');

    //this.users = this.userCollection.valueChanges({idField: 'id'});
    //this.staticUsers = this.staticUserCollection.valueChanges({idField: 'id'});
  }

  getUsers(callback: (error, data?) => void) {
    this.userCollection.valueChanges({idField: 'id'}) // Observable<User[]>
    .pipe(
      tap(
        data => {callback(null, data)},
        error => {callback(error)}
      )
    )
    .subscribe();
  }

  getUser(id: string, callback: (error, data?) => void) {
    this.userCollection.doc<User>(id).valueChanges() // Observable<User>
    .pipe(
      tap(
        data => {callback(null, data)},
        error => {callback(error)}
      )
    )
    .subscribe();
  }

  addUser(user: User, callback: (error, data?) => void) {
    this.userCollection.add(user) // Promise<DocumentReference>
    .then(
      data => {callback(null, data)},
      error => {callback(error)}
    );
  }

  updateUser(user: User, callback: (error, data?) => void) {
    this.userCollection.doc<User>(user.id).update(user) // Promise<void>
    .then(
      data => {callback(null, data)},
      error => {callback(error)}
    );
  }

  deleteUser(user: User, callback: (error, data?) => void) {
    this.userCollection.doc<User>(user.id).delete() // Promise<void>
    .then(
      data => {callback(null, data)},
      error => {callback(error)}
    );
  }

  getStaticUsers(callback: (error, data?) => void) {
    this.staticUserCollection.valueChanges({idField: 'id'}) // Observable<User[]>
    .pipe(
      tap(
        data => {callback(null, data)},
        error => {callback(error)}
      )
    )
    .subscribe();
  }

  getStaticUser(id: string, callback: (error, data?) => void)  {
    this.staticUserCollection.doc<User>(id).valueChanges() // Observable<User>
    .pipe(
      tap(
        data => {callback(null, data)},
        error => {callback(error)}
      )
    )
    .subscribe();
  }

  addStaticUser(user: User, callback: (error, data?) => void) {
    this.staticUserCollection.add(user) // Promise<DocumentReference>
    .then(
      data => {callback(null, data)},
      error => {callback(error)}
    );
  }

  updateStaticUser(user: User, callback: (error, data?) => void) {
    this.staticUserCollection.doc<User>(user.id).update(user) // Promise<void>
    .then(
      data => {callback(null, data)},
      error => {callback(error)}
    );
  }

  deleteStaticUser(user: User, callback: (error, data?) => void) {
    this.staticUserCollection.doc<User>(user.id).delete() // Promise<void>
    .then(
      data => {callback(null, data)},
      error => {callback(error)}
    );
  }
}
