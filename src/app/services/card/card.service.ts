import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
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
  private staticCardCollection: AngularFirestoreCollection<Card>;
  private cardCollection: AngularFirestoreCollection<Card>;

  private staticCards: Observable<Card[]>;
  private cards: Observable<Card[]>;

  constructor(private afs: AngularFirestore) {
    console.log("Card Service (constructor)");
    this.staticCardCollection = this.afs.collection<Card>('static_cards');
    this.cardCollection = this.afs.collection<Card>('cards');
    this.staticCards = this.staticCardCollection.valueChanges({idField: 'id'});
    this.cards = this.cardCollection.valueChanges({idField: 'id'});
  }

  listStaticCards(): Observable<Card[]> {
    return this.staticCards;
  }

  listStaticCardsByOwner(ownerId: string): Observable<Card[]> {
    return this.afs.collection<Card>('static_cards', ref => ref.where('owner', '==', ownerId)).valueChanges({idField:'id'});
  }

  listStaticCardsByHolder(holderId: string): Observable<Card[]> {
    return this.afs.collection<Card>('static_cards', ref => ref.where('holders', 'array-contains', holderId)).valueChanges({idField:'id'});
  }

  addStaticCard(card: Card): Promise<void> {
    //let newCardId = this.afs.createId();
    //card.id = newCardId;
    return this.staticCardCollection.doc<Card>().set(card);
  }

  getStaticCard(id: string): Observable<Card> {
    return this.staticCardCollection.doc<Card>(id).valueChanges();
  }

  updateStaticCard(card: Card): Promise<void> {
    return this.staticCardCollection.doc<Card>(card.id).update(card);
  }

  deleteStaticCard(id: string): Promise<void> {
    return this.staticCardCollection.doc<Card>(id).delete();
  }

  listCards(): Observable<Card[]> {
      return this.cards;
  }

  listCardsByOwner(ownerId: string): Observable<Card[]> {
    return this.afs.collection<Card>('cards', ref => ref.where('owner', '==', ownerId)).valueChanges({idField:'id'});
  }

  listCardsByHolder(holderId: string): Observable<Card[]> {
    return this.afs.collection<Card>('cards', ref => ref.where('holders', 'array-contains', holderId)).valueChanges({idField:'id'});
  }

  addCard(card: Card): Promise<void> {
    //let newCardId = this.afs.createId();
    //card.id = newCardId;
    return this.cardCollection.doc<Card>().set(card);
  }

  getCard(id: string): Observable<Card> {
     return this.cardCollection.doc<Card>(id).valueChanges();
  }

  updateCard(card: Card): Promise<void> {
    return this.cardCollection.doc<Card>(card.id).update(card);
  }

  deleteCard(id: string): Promise<void> {
    return this.cardCollection.doc<Card>(id).delete();
  }
}
