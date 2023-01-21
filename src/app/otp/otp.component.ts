import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { LoginService } from '../services/login/login.service';
import Swal from 'sweetalert2';
import { FirebaseJoueurService } from '../services/joueur/firebase-joueur.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
  constructor(private modalCtrl: ModalController,private router:Router,private loadingController: LoadingController,
    private loginService:LoginService,private fbJoueurService:FirebaseJoueurService,public afAuth: AngularFireAuth) { }

  ngOnInit() {}

  //close
  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onOtpChange($event:any){
    this.otpIsValid=false
    this.otpValeur=$event;
    console.log(this.otpValeur)
    if(this.otpValeur.length==6){
      console.log(this.otpValeur)
      this.Verifier(this.otpValeur)
      this.otpIsValid=true
    }

  }


  sendCode(){
    this.close()
    this.router.navigate(['/inscription'])
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


  //methode for verifie code
  Verifier(code:String){
    this.loginService.enterVerificationCode(code).then(
      async userData => {
        //await this.dismiss_loader()
        this.presentAlert();

        // this.afAuth.authState.subscribe(auth => {
        //   //voir si l'utilisateur n'a pas deja un compte
        //   this.fbJoueurService.getTask(auth?.uid).subscribe((res)=>{

        //     if(res){
        //       //console.log(res)
        //     }else {

        //       var user={
        //         'id':auth?.uid,
        //         'numero':auth?.phoneNumber
        //       }
        //       //this.user=new User(auth.uid,null,null,null,auth.phoneNumber,null,null,null,null,null)
        //       this.fbJoueurService.create(user)
        //         .then(() => {

        //         }).catch((err:any) => {
        //           //console.log(err)
        //         });
        //     }

        //   })
        // });

      }
    ).catch((error) => {
      this.presentAlertError();
    });;
  }


  /////
  async presentAlert() {
    Swal.fire({
      title:'Succes !',
      text:'Vous êtes authentifié !!',
      icon:'success',
      heightAuto: false,
      confirmButtonColor:"#FF7900"
    })
  }


  async presentAlertError() {
    Swal.fire({
      title:'Erreur !',
      text:'Code Incorrect !',
      icon:'error',
      heightAuto: false,
      confirmButtonColor:"#d81414"
    })
  }
}
