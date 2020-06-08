import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Card {
  id?: string,
  frontImg?: string,
  backImg?: string,
  owner?: string,
  holders?: string[]
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards: Observable<Card[]>;
  private staticCards: Observable<Card[]>;
  private cardCollection: AngularFirestoreCollection<Card>;
  private staticCardCollection: AngularFirestoreCollection<Card>;

  constructor(private afs: AngularFirestore) {
    console.log("Card Service Start");
    this.staticCardCollection = this.afs.collection<Card>('static_cards');
    this.cardCollection = this.afs.collection<Card>('cards');
    this.staticCards = this.staticCardCollection.valueChanges({idField: 'id'});
    this.cards = this.cardCollection.valueChanges({idField: 'id'});
  }

  listCards(callback) {
    this.cards
    .subscribe(
      data => callback(null, data),
      error => callback(error)
    );
  }

  listCardsByOwner(ownerId: string, callback) {
    this.afs.collection<Card>('cards', ref => ref.where('owner', '==', ownerId))
    .valueChanges({idField:'id'})
    .subscribe(
      data => callback(null, data),
      error => callback(error)
    );
  }

  listCardsByHolder(holderId: string, callback) {
    this.afs.collection<Card>('cards', ref => ref.where('holders', 'array-contains', holderId))
    .valueChanges({idField:'id'})
    .subscribe(
      data => callback(null, data),
      error => callback(error)
    );
  }

  getCard(id: string, callback) {
    return this.cardCollection.doc<Card>(id)
    .valueChanges()
    .subscribe(
      data => callback(null, data),
      error => callback(error)
    );
  }

  addCard(card: Card, callback) {
    this.cardCollection.add(card)
    .then(
      data => callback(null, data),
      error => callback(error)
    );
  }

  updateCard(id: string, card: Card, callback) {
    this.cardCollection.doc<Card>(id).update(card)
    .then(
      data => callback(null, data),
      error => callback(error)
    );
  }

  deleteCard(id: string, callback) {
    this.cardCollection.doc<Card>(id).delete()
    .then(
      data => callback(null, data),
      error => callback(error)
    );
  }

  listStaticCards(callback) {
    this.staticCards
    .subscribe(
      data => callback(null, data),
      error => callback(error)
    );
  }

  listStaticCardsByOwner(ownerId: string, callback) {
    this.afs.collection<Card>('static_cards', ref => ref.where('owner', '==', ownerId))
    .valueChanges({idField:'id'})
    .subscribe(
      data => callback(null, data),
      error => callback(error)
    );
  }

  listStaticCardsByHolder(holderId: string, callback) {
    this.afs.collection<Card>('static_cards', ref => ref.where('holders', 'array-contains', holderId))
    .valueChanges({idField:'id'})
    .subscribe(
      data => callback(null, data),
      error => callback(error)
    );
  }

  getStaticCard(id: string, callback) {
    this.staticCardCollection.doc<Card>(id)
    .valueChanges()
    .subscribe(
      data => callback(null, data),
      error => callback(error)
    );
  }

  addStaticCard(card: Card, callback) {
    this.staticCardCollection.add(card)
    .then(
      data => callback(null, data),
      error => callback(error)
    );
  }

  updateStaticCard(id: string, card: Card, callback) {
    this.staticCardCollection.doc<Card>(id).update(card)
    .then(
      data => callback(null, data),
      error => callback(error)
    );
  }

  deleteStaticCard(id: string, callback) {
    this.staticCardCollection.doc<Card>(id).delete()
    .then(
      data => callback(null, data),
      error => callback(error)
    );
  }
}
