import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

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
  constructor(private loadingController: LoadingController) { }

  ngOnInit() {
  }


  //changement du code pays
  countryCodeChange($event:any) {
    this.CountryCode = $event.detail.value;
    //console.log(this.CountryCode);

  }

  //login with phone number
  async signinWithPhoneNumber($event:any) {
    this.presentLoadingWithOptions()
  }





  //chargeur
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      id:"loader",
      spinner: "bubbles",
      // duration: 5000,
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
}
