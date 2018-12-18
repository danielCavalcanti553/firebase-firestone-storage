import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

import firebase from 'firebase';
import { DatePipe } from '@angular/common';

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
  imagem : any;

  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage : AngularFireStorage,
    public firebaseauth : AngularFireAuth) { // Uso de formulários
      
      this.firestore.settings(this.settings);
      // inicia o formulário
      this.form();

  }

  form(){
    this.formGroup = this.formBuilder.group({    
      usuario : ['', [Validators.required]],
      mensagem: ['', [Validators.required]],
      id : [''],
      imagem : [''],
      data : [firebase.firestore.FieldValue.serverTimestamp()]
    });
  }

  ionViewDidLoad() {
    
    console.log(firebase.firestore.FieldValue.serverTimestamp());

    
    this.getList();
  }

  getList(){

    var postRef = firebase.firestore()
    .collection("mensagem").orderBy('data','desc');
      // .orderBy("data", "desc");
    postRef.get().then(query => {
      query.forEach(doc => {
        this.mensagens.push(doc.data());
      });
    });
   
  }

  detalhe(id : string){
    console.log(id);
    this.navCtrl.push("MensagemDetalhePage",{'id' : id});
  }

  cadastrar(){

    // Pega o id único do usuário
    this.formGroup.controls['usuario']
      .setValue(this.firebaseauth.auth.currentUser.uid);
      
      // Tenta cadastrar a mensagem
      this.firestore.collection("mensagem").add(
        this.formGroup.value
      ).then(ref => {
        // Sucesso
        console.log("Cadastrado com sucesso");
        console.log(ref.id);
        this.add(ref.id);

      }).catch(err => {
        console.log(err.message);
      });
  }

  enviaArquivo(event){
    // Pega o arquivo 
    this.imagem = event.srcElement.files[0];
  }

  add(id : string){
   
    // Diretório + caminho imagem no servidor
    let caminho = firebase.storage().ref().child(`images/${id}.jpg`);
    // Executa o upload
    caminho.put(this.imagem).then(resp => {
      // Se sucesso, pega a url para download da imagem
      caminho.getDownloadURL().then(url=>{
        // adicionar a url da imagem no form
        // this.formGroup.controls['imagem'].setValue(this.msg = url);
        // Cadastra os dados no Firestone
        console.log("imagem enviada")
        this.firestore.collection("mensagem")
          .doc(id).update({'imagem' : url, 'id' : id}).then(() =>{
            this.mensagens = [];
            this.form();
            this.getList();
          });
      });
    }).catch(err => {
      //Houve algum erro
      this.msg = err.message;
    })
  }

}
