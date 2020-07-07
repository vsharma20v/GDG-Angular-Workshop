import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";

export interface Choice {
  id: number;
  name: string;
  votes: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChoicesService {

  private choicesCollection: AngularFirestoreCollection<Choice>;
  public choices: Observable<Choice[]>;

  constructor(private fs: AngularFirestore) {
    this.choicesCollection = fs.collection<Choice>("choices",ref=>ref.orderBy("votes","desc"));
    this.choices = this.choicesCollection.valueChanges({ idField: "id" });
  }

  addChoice(choice) {
    this.choicesCollection.add(choice);
  }

  addVote(choice) {
    let choiceDoc = this.fs.doc<any>(`choices/${choice.id}`);
    choiceDoc.update({ votes: choice.votes + 1 });
  }

}
