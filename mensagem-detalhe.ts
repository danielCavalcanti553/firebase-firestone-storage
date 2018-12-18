import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-mensagem-detalhe',
  templateUrl: 'mensagem-detalhe.html',
})
export class MensagemDetalhePage {
  
  mensagem : any;
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {

      let docRef = firebase.firestore().collection("mensagem").doc(this.navParams.get('id'));

      docRef.get().then(doc => {
        if (doc.exists) {
          this.mensagem =  doc.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("Não encontrado!");
        }
    }).catch(error => {
        console.log("Erro no envio:", error);
    });

  }

  ionViewDidLoad() {
    console.log("ID PAGE "+this.navParams.get('id'));
  }



}
