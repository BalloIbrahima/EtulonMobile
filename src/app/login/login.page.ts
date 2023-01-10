import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { OtpComponent } from '../otp/otp.component';

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

  //error
  Iserror!: Boolean;
  erreur!: String;
  //
  constructor(private loadingController: LoadingController,private modalCtrl: ModalController,public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }


  //changement du code pays
  countryCodeChange($event:any) {
    this.CountryCode = $event.detail.value;
    //console.log(this.CountryCode);

  }

  //login with phone number
  async signinWithPhoneNumber($event:any) {
    //this.presentLoadingWithOptions()
    this.afficherModal()

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
      // this.boiteConfirmation();
      //this.message = `Hello, ${data}!`;
    }
  }

  //
  canDismiss = false;

  presentingElement = null;

}
