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
    console.log("Card Service (constructor)");
    this.staticCardCollection = this.afs.collection<Card>('static_cards');
    this.cardCollection = this.afs.collection<Card>('cards');
    this.staticCards = this.staticCardCollection.valueChanges({idField: 'id'});
    this.cards = this.cardCollection.valueChanges({idField: 'id'});
  }

  // @deprecated
  listCards(): Observable<Card[]> {
    return this.cards;
  }

  // @deprecated
  listCardsByOwner(ownerId: string): Observable<Card[]> {
    return this.afs.collection<Card>('cards', ref => ref.where('owner', '==', ownerId)).valueChanges({idField:'id'});
  }

  // @deprecated
  listCardsByHolder(holderId: string): Observable<Card[]> {
    return this.afs.collection<Card>('cards', ref => ref.where('holders', 'array-contains', holderId)).valueChanges({idField:'id'});
  }

  // @deprecated
  addCard(card: Card): Promise<DocumentReference> {
    //let newCardId = this.afs.createId();
    //card.id = newCardId;
    return this.cardCollection.add(card);
  }

  // @deprecated
  getCard(id: string): Observable<Card> {
     return this.cardCollection.doc<Card>(id).valueChanges();
  }

  // @deprecated
  updateCard(id: string, card: Card): Promise<void> {
    return this.cardCollection.doc<Card>(id).update(card);
  }

  // @deprecated
  deleteCard(id: string): Promise<void> {
    return this.cardCollection.doc<Card>(id).delete();
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

  // @deprecated
  listStaticCards(): Observable<Card[]> {
    return this.staticCards;
  }

  // @deprecated
  listStaticCardsByOwner(ownerId: string): Observable<Card[]> {
    return this.afs.collection<Card>('static_cards', ref => ref.where('owner', '==', ownerId)).valueChanges({idField:'id'});
  }

  // @deprecated
  listStaticCardsByHolder(holderId: string): Observable<Card[]> {
    return this.afs.collection<Card>('static_cards', ref => ref.where('holders', 'array-contains', holderId)).valueChanges({idField:'id'});
  }

  // @deprecated
  addStaticCard(card: Card): Promise<DocumentReference> {
    //let newCardId = this.afs.createId();
    //card.id = newCardId;
    return this.staticCardCollection.add(card);
  }

  // @deprecated
  getStaticCard(id: string): Observable<Card> {
    return this.staticCardCollection.doc<Card>(id).valueChanges();
  }

  // @deprecated
  updateStaticCard(id: string, card: Card): Promise<void> {
    return this.staticCardCollection.doc<Card>(id).update(card);
  }

  // @deprecated
  deleteStaticCard(id: string): Promise<void> {
    return this.staticCardCollection.doc<Card>(id).delete();
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
    this.staticCardCollection.doc<Card>(id).valueChanges()
    .then(
      data => callback(null, data),
      error => callback(error)
    );
  }

  addStaticCard(card: Card, callback) {
    this.staticCardCollection.add(card)
    .subscribe(
      data => callback(null, data),
      error => callback(error)
    );
  }

  updateStaticCard(id: string, card: Card, callback) {
    this.staticCardCollection.doc<Card>(id).update(card)
    .subscribe(
      data => callback(null, data),
      error => callback(error)
    );
  }

  deleteStaticCard(id: string, callback) {
    this.staticCardCollection.doc<Card>(id).delete()
    .subscribe(
      data => callback(null, data),
      error => callback(error)
    );
  }
}
