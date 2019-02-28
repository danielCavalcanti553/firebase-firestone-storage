import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormBuilder } from '@angular/forms';
import firebase from 'firebase';
import { DadosPessoais } from '../../model/dados-pessoais';


@IonicPage()
@Component({
  selector: 'page-dados-pessoais',
  templateUrl: 'dados-pessoais.html',
})
export class DadosPessoaisPage {
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
  formGroup : FormGroup;
  dadosPessoais : DadosPessoais[] = new Array();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public auth : AngularFireAuth, 
    public formBuilder : FormBuilder) {

      this.formGroup = this.formBuilder.group({
        endereco : ['Rua x'],
        telefone : [],
        UID : ['55555']
      });

      this.firestore.settings(this.settings);
      
  }

  ionViewDidLoad() {
   // this.formGroup['UID'] = this.auth.auth.currentUser.uid;
    console.log(this.formGroup); 
    this.visualizar(); 
  }

  cadastrar(){

    this.firestore.collection("infoPessoais").add(
      this.formGroup.value

     ).then(ref => {
      console.log(ref);

    }).catch(err => {
      console.log(err.message);
    });

  }

  visualizar(){
    


    var ref = this.firestore.collection('infoPessoais');
    ref.get().then(query=>{
      
      query.forEach(doc => {   
          let dp : DadosPessoais = new DadosPessoais(doc.data());
          this.dadosPessoais.push(dp);
      })
          
      console.log(this.dadosPessoais)
    }) 

  }

/*
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
  } */
}
