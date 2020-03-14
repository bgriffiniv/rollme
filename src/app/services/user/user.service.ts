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
  //private users: Observable<User[]>;
  //private staticUsers: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;
  private staticUserCollection: AngularFirestoreCollection<User>;

  subscription: any;

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<User>('staticusers');
    //console.log(this.afs);
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
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
