import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
import { map, take, filter, tap } from 'rxjs/operators';
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
  private staticUsers: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;
  private staticUserCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    console.log('User Service Start');
    this.staticUserCollection = this.afs.collection<User>('static_users');
    this.userCollection = this.afs.collection<User>('users');
    this.staticUserCollection = this.afs.collection<User>('static_users');    console.log(this.afs);
    this.users = this.userCollection.valueChanges({idField: 'id'});
    this.staticUsers = this.staticUserCollection.valueChanges({idField: 'id'});
  }

  listUsers(): Observable<User[]> {
    return this.users;
  }

  getUser(id: string, callback) {
    this.userCollection.doc<User>(id).get()
    .subscribe(
      d => callback(null, d),
      e => callback(e)
    );
  }

  addUser(user: User, callback) {
    this.userCollection.add(user)
    .then(d => callback(null,d))
    .catch(e => callback(e));
  }

  updateUser(id: string, user: User callback) {
    this.userCollection.doc<User>(id).update(user)
    .then(d => callback(null,d))
    .catch(e => callback(e));
  }

  deleteUser(id: string, callback) {
    this.userCollection.doc(id).delete()
    .then(d => callback(null,d))
    .catch(e => callback(e));
  }

  listStaticUsers(): Observable<User[]> {
    this.staticUsers;
  }

  getStaticUser(id: string, callback) {
    this.staticUserCollection.doc<User>(id).get()
    .subscribe(
      d => callback(null, d),
      e => callback(e)
    );
  }

  addStaticUser(user: User, callback) {
    this.staticUserCollection.add(user)
    .then(d => callback(null,d))
    .catch(e => callback(e));
  }

  updateStaticUser(id: string, user: User, callback) {
    this.staticUserCollection.doc<User>(id).update(user)
    .then(d => callback(null,d))
    .catch(e => callback(e));
  }

  deleteStaticUser(id:string, callback) {
    this.staticUserCollection.doc(id).delete()
    .then(d => callback(null,d))
    .catch(e => callback(e));
  }
}
