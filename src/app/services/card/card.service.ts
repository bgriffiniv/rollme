import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
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

  getCards(): Observable<Card[]> {
    return this.cardCollection.valueChanges({idField: 'id'});
  }

  getCard(id: string): Observable<Card> {
    return this.cardCollection.doc<Card>(id).valueChanges();
  }

  addCard(card: Card): Promise<DocumentReference> {
    return this.cardCollection.add(card);
  }

  updateCard(card: Card): Promise<void> {
    return this.cardCollection.doc<Card>(card.id).update(card);
  }

  deleteCard(id: string): Promise<void> {
    return this.cardCollection.doc<Card>(id).delete();
  }

  getStaticCards(): Observable<Card[]> {
    return this.staticCardCollection.valueChanges({idField: 'id'});
  }

  getStaticCard(id: string): Observable<Card> {
    return this.staticCardCollection.doc<Card>(id).valueChanges();
  }

  addStaticCard(card: Card): Promise<DocumentReference> {
    return this.staticCardCollection.add(card);
  }

  updateStaticCard(card: Card): Promise<void> {
    return this.staticCardCollection.doc<Card>(card.id).update(card);
  }

  deleteStaticCard(id: string): Promise<void> {
    return this.staticCardCollection.doc<Card>(id).delete();
  }
}
