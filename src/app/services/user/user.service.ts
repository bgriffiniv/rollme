import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
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
  private staticUserCollection: AngularFirestoreCollection<User>;

  subscription: any;

  constructor(private afs: AngularFirestore) {
    console.log('Auth Service constructor');
    this.userCollection = this.afs.collection<User>('users');
    this.staticUserCollection = this.afs.collection<User>('static_users');
  }

  ngOnInit() {
    console.log('Auth Service init');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  listStaticUsers(callback) {
    this.staticUserCollection.get()
    .subscribe(a => {
      let staticUsers = [];
      a.forEach(b => {
        let staticUser = b.data() as User;
        staticUser.id = b.id;
        staticUsers.push(staticUser);
      });
      callback(null, staticUsers);
    }, e => {callback(e);});
  }

  getStaticUser(id: string, callback) {
    this.staticUserCollection.doc<User>(id).get()
    .subscribe(d => {
      let staticUser = d.data() as User;
      staticUser.id = d.id;
      callback(null, staticUser);
    }, e => {callback(e);});
  }

  addStaticUser(user: User, callback) {
    this.staticUserCollection.add(user)
    .then(d => {callback(null,d);})
    .catch(e => {callback(e);});
  }

  updateStaticUser(user: User, callback) {
    this.staticUserCollection.doc<User>(user.id).update(user)
    .then(d => {callback(null,d);})
    .catch(e => {callback(e);});
  }

  deleteStaticUser(user: User, callback) {
    return this.staticUserCollection.doc(user.id).delete()
    .then(d => {callback(null,d);})
    .catch(e => {callback(e);});
  }

  listUsers(): Observable<User[]> {
    return this.users;
  }

  getUser(id: string, callback) {
    this.userCollection.doc<User>(id).get()
    .subscribe(d => {
      let user = d.data() as User;
      user.id = d.id;
      callback(null, user);
    }, e => {callback(e);});
  }

  addUser(user: User, callback) {
    this.userCollection.doc<User>(user.id).set(user)
    .then(d => {callback(null,d);})
    .catch(e => {callback(e);});
  }

  updateUser(user: User, callback) {
    this.userCollection.doc<User>(user.id).update(user)
    .then(d => {callback(null,d);})
    .catch(e => {callback(e);});
  }

  deleteUser(user: User, callback) {
    return this.userCollection.doc(user.id).delete()
    .then(d => {callback(null,d);})
    .catch(e => {callback(e);});
  }
}
