import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Card {
  id?: string,
  frontImg?: string,
  backImg?: string,
  holders?: {id: string, name: string}[],
  owners?: {id: string, name: string}
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private staticCardCollection: AngularFirestoreCollection<Card>;
  private cardCollection: AngularFirestoreCollection<Card>;
  //private staticCards: Observable<Card[]>;
  //private cards: Observable<Card[]>;

  constructor(private afs: AngularFirestore) {
    console.log('Card Service constructor');

    this.cardCollection = this.afs.collection<Card>('cards');
    this.staticCardCollection = this.afs.collection<Card>('static_cards');

    //this.cards = this.cardCollection.valueChanges({idField: 'id'});
    //this.staticCards = this.staticCardCollection.valueChanges({idField: 'id'});
  }

  getCards(callback: (error, data?) => void) {
    this.cardCollection.valueChanges({idField: 'id'}) // Observable<Card[]>
    .pipe(
      tap(
        data => {callback(null, data)},
        error => {callback(error)}
      )
    )
    .subscribe();
  }

  getCard(id: string, callback: (error, data?) => void) {
    this.cardCollection.doc<Card>(id).valueChanges() // Observable<Card>
    .pipe(
      tap(
        data => {callback(null, data)},
        error => {callback(error)}
      )
    )
    .subscribe();
  }

  addCard(card: Card, callback: (error, data?) => void) {
    this.cardCollection.add(card) // Promise<DocumentReference>
    .then(
      data => {callback(null, data)},
      error => {callback(error)}
    );
  }

  updateCard(card: Card, callback: (error, data?) => void) {
    this.cardCollection.doc<Card>(card.id).update(card) // Promise<void>
    .then(
      data => {callback(null, data)}, // data will be null
      error => {callback(error)}
    );
  }

  deleteCard(id: string, callback: (error, data?) => void) {
    this.cardCollection.doc<Card>(id).delete() // Promise<void>
    .then(
      data => {callback(null, data)}, // data will be null
      error => {callback(error)}
    );
  }

  getStaticCards(callback: (error, data?) => void) {
    this.staticCardCollection.valueChanges({idField: 'id'}) // Observable<Card[]>
    .pipe(
      tap(
        data => {callback(null, data)},
        error => {callback(error)}
      )
    )
    .subscribe();
  }

  getStaticCard(id: string, callback: (error, data?) => void) {
    this.staticCardCollection.doc<Card>(id).valueChanges() // Observable<Card>
    .pipe(
      tap(
        data => {callback(null, data)},
        error => {callback(error)}
      )
    )
    .subscribe();
  }

  addStaticCard(card: Card, callback: (error, data?) => void) {
    this.staticCardCollection.add(card) // Promise<DocumentReference>
    .then(
      data => {callback(null, data)},
      error => {callback(error)}
    );
  }

  updateStaticCard(card: Card, callback: (error, data?) => void) {
    this.staticCardCollection.doc<Card>(card.id).update(card) // Promise<void>
    .then(
      data => {callback(null, data)},
      error => {callback(error)}
    );
  }

  deleteStaticCard(id: string, callback: (error, data?) => void) {
    this.staticCardCollection.doc<Card>(id).delete() // Promise<void>
    .then(
      data => {callback(null, data)},
      error => {callback(error)}
    );
  }
}
