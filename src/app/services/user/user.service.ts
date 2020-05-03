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

  getUsers(): Observable<User[]> {
    return this.userCollection.valueChanges({idField: 'id'});
  }

  getUser(id: string): Observable<User> {
    return this.userCollection.doc<User>(id).valueChanges();
  }

  addUser(user: User): Promise<DocumentReference> {
    return this.userCollection.add(user);
  }

  updateUser(user: User): Promise<void> {
    return this.userCollection.doc<User>(user.id).update(user);
  }

  deleteUser(user: User): Promise<void> {
    return this.userCollection.doc<User>(user.id).delete();
  }

  getStaticUsers(): Observable<User[]> {
    return this.staticUserCollection.valueChanges({idField: 'id'});
  }

  getStaticUser(id: string): Observable<User> {
    return this.staticUserCollection.doc<User>(id).valueChanges();
  }

  addStaticUser(user: User): Promise<DocumentReference> {
    return this.staticUserCollection.add(user);
  }

  updateStaticUser(user: User): Promise<void> {
    return this.staticUserCollection.doc<User>(user.id).update(user);
  }

  deleteStaticUser(user: User): Promise<void> {
    return this.staticUserCollection.doc<User>(user.id).delete();
  }
}
