import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Card {
  id?: string,
  frontImg?: string
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards: Observable<Card[]>;
  private cardCollection: AngularFirestoreCollection<Card>;

  constructor(private afs: AngularFirestore) {
    console.log('Card Service constructor');

    this.cardCollection = this.afs.collection<Card>('static_cards');
    console.log(this.afs);
    this.cards = this.cardCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getCards(): Observable<Card[]> {
      return this.cards;
  }

  getCard(id: string): Observable<Card> {
     return this.cardCollection.doc<Card>(id).valueChanges().pipe(
       take(1),
       map(card => {
         card.id = id;
         return card
       })
     );
  }

  addCard(card: Card): Promise<DocumentReference> {
    return this.cardCollection.add(card);
  }

  updateCard(card: Card): Promise<void> {
    return this.cardCollection.doc(card.id).update({ frontImg: card.frontImg });
  }

  deleteCard(id: string): Promise<void> {
    return this.cardCollection.doc(id).delete();
  }
}
