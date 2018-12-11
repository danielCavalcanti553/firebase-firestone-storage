import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-mensagem',
  templateUrl: 'mensagem.html',
})
export class MensagemPage {

  formGroup : FormGroup; // Armazena dados do formuláro
                        // necessário import ReactiveFormsModule em app.module.ts
  mensagens : any[] = new Array(); // armazena mensagens

  msg : string = "";

 
  storageRef = firebase.storage().ref();

  id : string = this.fireStore.createId();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public fireStore: AngularFirestore, // Uso database firestore
    public formBuilder: FormBuilder,
    public storage : AngularFireStorage,
    public firebaseauth : AngularFireAuth) { // Uso de formulários
      // inicia o formulário
      this.formGroup = this.formBuilder.group({    
        usuario : ['', [Validators.required]],
        mensagem: ['', [Validators.required]],
        id : [''],
        imagem : ['']
      });

  }

  ionViewDidLoad() {
    this.getList();
  }

  add(){

    let id = this.fireStore.createId();
    this.formGroup.controls['id'].setValue(id);
    this.formGroup.controls['usuario'].setValue(this.firebaseauth.auth.currentUser.uid);
 
      this.fireStore.doc(`mensagem/${this.fireStore.createId()}`).set(
        this.formGroup.value
      ).then(()=>{
        this.msg = "cadastrado";
      }).catch(err => {
        this.msg = err;
      });

  }

  getList(){

    var postRef = firebase.firestore()
    .collection("mensagem");
      // .orderBy("data", "desc");
    postRef.get().then(query => {
      query.forEach(doc => {
        this.mensagens.push(doc.data());
      });
    });
   
  }

  enviaArquivo(event){

    let arquivo = event.srcElement.files[0];
    let caminho = this.storageRef.child(`images/${this.id}.jpg`);
    caminho.put(arquivo).then(resp => {
      caminho.getDownloadURL().then(url=>{
        this.formGroup.controls['imagem'].setValue(this.msg = url);
      });
    }).catch(err => {
      //let peopleArray = Object.keys(err).map(i => err[i])
      this.msg = err.message;
    })
  }

}
