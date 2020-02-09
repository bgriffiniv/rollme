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
  private staticUsers: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;
  private staticUserCollection: AngularFirestoreCollection<User>;

  subscription: any;

  constructor(private afs: AngularFirestore) {
    console.log('Auth Service constructor');
    this.userCollection = this.afs.collection<User>('users');
    this.staticUserCollection = this.afs.collection<User>('static-users');
    console.log(this.afs);
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

  ngOnInit() {
    console.log('Auth Service init');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getUsers(): Observable<User[]> {
    return this.users;
  }
/*
  getUser(id: string): Observable<User> {
    return this.userCollection.doc<User>(id).valueChanges().pipe(
      take(1),
      map(user => {
        user.id = id;
        return user
      })
    );
  }
*/

  getUser(id: string, callback) {
    this.subscription = this.userCollection.doc<User>(id).get()
    .subscribe(user => {
      if (!user) {
        console.log('Error finding user with id : ' + id);
        callback(user);
      }

      console.log('User found with id : ' + id);
      callback(null, user);
    });
  }

  addUser(user: User): Promise<DocumentReference> {
    return this.userCollection.add(user);
  }

  updateUser(user: User): Promise<void> {
    return this.userCollection.doc(user.id).update({ name: user.name, bio: user.bio });
  }

  deleteUser(id: string): Promise<void> {
    return this.userCollection.doc(id).delete();
  }
}
