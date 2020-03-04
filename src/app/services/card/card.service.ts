import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Card {
  id?: string,
  frontImg?: string,
  backImg?: string
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private staticCardCollection: AngularFirestoreCollection<Card>;
  private cardCollection: AngularFirestoreCollection<Card>;

  constructor(private afs: AngularFirestore) {
    console.log("Card Service (constructor)");
    this.staticCardCollection = this.afs.collection<Card>('static_cards');
    this.cardCollection = this.afs.collection<Card>('cards');
    /*
    this.cards = this.cardCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    */
  }

  listStaticCards(): Observable<Card[]> {
    return this.staticCardCollection.valueChanges();
  }

  getStaticCards(id: string): Observable<Card> {
    return this.staticCardCollection.doc<Card>(id).valueChanges();
  }

  listCards(): Observable<Card[]> {
      return this.cardCollection.valueChanges();
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
    return this.cardCollection.doc(card.id).update({ frontImg: card.frontImg, backImg: card.backImg });
  }

  deleteCard(id: string): Promise<void> {
    return this.cardCollection.doc(id).delete();
  }
}
