import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  otpIsValid=false
  canDismiss = false;
  otpValeur:any=''
  presentingElement = null;

  //error
  Iserror!: Boolean;
  erreur!: String;
  //

  //donnee venant de la page parante
  data:any
  constructor(private modalCtrl: ModalController,private router:Router) { }

  ngOnInit() {}

  //close
  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onOtpChange($event:any){
    this.otpIsValid=false
    this.otpValeur=$event;
    console.log(this.otpValeur)
    if(this.otpValeur.length==5){
      this.otpIsValid=true
    }

  }


  sendCode(){
    this.close()
    this.router.navigate(['/inscription'])
  }
}
