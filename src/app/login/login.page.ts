import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { OtpComponent } from '../otp/otp.component';
import { Network } from '@capacitor/network';
import { LoginService } from '../services/login/login.service';
import * as firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  CountryCode: any = '+223';
  CountryJson = environment.CountryJson;
  OTP: string = '';
  Code: any;
  PhoneNo: any;
  recaptchaVerifier: firebase.default.auth.RecaptchaVerifier;


  isConnected=false;

  //error
  Iserror!: Boolean;
  erreur!: String;
  //
  constructor(private loadingController: LoadingController,private modalCtrl: ModalController,public actionSheetController: ActionSheetController, private loginService:LoginService) { }

  ngOnInit() {
    this.Verification_Internet()
  }



  //changement du code pays
  countryCodeChange($event:any) {
    this.CountryCode = $event.detail.value;
    //console.log(this.CountryCode);

  }

  //login with phone number
  async signinWithPhoneNumber($event:any) {
    //this.presentLoadingWithOptions()

    this.presentLoadingWithOptions()

    try {
      if (this.PhoneNo && this.CountryCode) {
        console.log(this.CountryCode,  this.PhoneNo)
        this.loginService.signInWithPhoneNumber(this.recaptchaVerifier, this.CountryCode + this.PhoneNo).then(
         async success => {
          console.log('successss')
           await this.dismiss_loader()
           this.afficherModal();

         }
       );

     }
    } catch (error) {
      this.dismiss_loader()
    }

  }





  //chargeur
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      id:"loader",
      spinner: "bubbles",

      message: 'Veuillez patientez...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
   }).then(a => {
    a.present().then(() => {

    });
  })

    // return await loading.present();
  }

  async dismiss_loader() {
    return await this.loadingController.dismiss();
  }

  //afficher le modal otp
  async afficherModal(){
    const modal = await this.modalCtrl.create({
      component: OtpComponent,
      componentProps: {
        'data': this.CountryCode+' '+this.PhoneNo,

      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //this.rou
      // this.boiteConfirmation();
      //this.message = `Hello, ${data}!`;
    }
  }

  //
  canDismiss = false;

  presentingElement = null;

  //verifie network connection
  async Verification_Internet(){
    let status = await Network.getStatus();
    this.isConnected=status.connected
    return this.isConnected
  }


  async ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response:any) => {

      },
      'expired-callback': () => {
      }
    });
  }
  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response:any) => {

      },
      'expired-callback': () => {
      }
    });
  }


}
