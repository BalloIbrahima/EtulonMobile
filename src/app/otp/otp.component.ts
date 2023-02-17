import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getTimeGivenProgression, LoadingController, ModalController } from '@ionic/angular';
import { LoginService } from '../services/login/login.service';
import Swal from 'sweetalert2';
import { FirebaseJoueurService } from '../services/joueur/firebase-joueur.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SpringJoueurService } from '../services/joueur/spring-joueur.service';
import { TokenService } from '../services/token/token.service';

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


  constructor(private modalCtrl: ModalController,private router:Router,private loadingController: LoadingController,private tokenStorage:TokenService,
    private loginService:LoginService,private fbJoueurService:FirebaseJoueurService,private sbJoueurService:SpringJoueurService,public afAuth: AngularFireAuth) { }

  ngOnInit() {}

  //close
  close(message:any) {
    return this.modalCtrl.dismiss(null, message);
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


    this.presentLoadingWithOptions()
    //verification si le user possede daje un compte
    this.sbJoueurService.GetByTelephone(this.data).subscribe(res=>{
      console.log(res)
      if(res.data==null){
        //sinon
        this.dismiss_loader()
        this.close('confirm')
        this.router.navigate(['/inscription'])

      }else{

        //sil exite on l'authentifie
        this.afAuth.authState.subscribe(auth => {
          console.log('authentifie')
          console.log(auth?.uid)
          //voir si l'utilisateur n'a pas deja un compte
          this.fbJoueurService.getTask(auth?.uid).subscribe((res2:any)=>{
            console.log(res2)
            if(res2){
              console.log(res2)

              this.loginService.login(res2.username,res2.id).subscribe(retour=>{
                console.log(retour)
                this.tokenStorage.saveToken(retour.token);
                this.tokenStorage.saveRefreshToken(retour.refreshToken)
                this.tokenStorage.saveUser(retour);

                if(retour.token){
                  setTimeout(() => {
                    this.dismiss_loader()

                    this.close('confirm')
                    this.router.navigate(['../tabs'])
                  }, 1000);
                  //this.router.navigate(['../tabs'])
                }



              })
            }else {

            }

          })
        });
      }
    },error=>{

    })


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
        this.sendCode()
        localStorage.setItem('numero',this.data)

        // this.afAuth.authState.subscribe(auth => {
        //   //voir si l'utilisateur n'a pas deja un compte
        //   this.fbJoueurService.getTask(auth?.uid).subscribe((res)=>{

        //     if(res){
        //       console.log(res)
        //     }else {

        //       var user={
        //         'id':auth?.uid,
        //         'numero':auth?.phoneNumber,
        //         'username':null
        //       }
        //       //this.user=new User(auth.uid,null,null,null,auth.phoneNumber,null,null,null,null,null)
        //       this.fbJoueurService.create(user)
        //         .then(() => {
        //           console.log('uservfirebase created')
        //         }).catch((err:any) => {
        //           console.log(err)
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
