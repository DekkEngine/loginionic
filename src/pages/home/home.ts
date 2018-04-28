import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

//plugins
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  perfil:any;
  texto:string;

  constructor(public navCtrl: NavController,
              private fb:Facebook,
              private alertCtrl:AlertController) {
  }

  loginWithFacebook(){
    this.fb.login(['public_profile', 'email']).then( (fbResponse: FacebookLoginResponse) =>{
      this.fb.api("/me?fields=id,name,email,first_name,last_name,picture,permissions", ['public_profile'])
          .then( r =>{
            this.perfil = r;
            this.texto = JSON.stringify( this.perfil );
            this.showAlert( "Perfil", this.texto );
          });
    });
  }

  showAlert( titulo, mensaje ){
    let alert = this.alertCtrl.create({
      title : titulo,
      subTitle : mensaje,
      buttons : ['OK']
    }).present();
  }

}
