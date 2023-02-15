import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, finalize } from 'rxjs';
import { Fichier } from '../services/file/file';
import { FirebaseJoueurService } from '../services/joueur/firebase-joueur.service';
import { SpringJoueurService } from '../services/joueur/spring-joueur.service';
import { LoginService } from '../services/login/login.service';
import { TokenService } from '../services/token/token.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {

  //user infos
  nomComplet:any;
  username:any;
  email:any;
  dateNaissance:any;

  ///
  message:any
  erreur:any
  fichier:any=null
  imgChosed:any='assets/images/moi.jpg'

  citoyen:any
  isErrorBack:any=false
  erreurBack:any=''

  user:any;

  constructor(private router:Router,private fbJoueurService:FirebaseJoueurService,private sbJoueurService:SpringJoueurService,public afAuth: AngularFireAuth,private loginService:LoginService,
    private tokenService:TokenService,private db: AngularFireDatabase, private storage: AngularFireStorage,private loadingController: LoadingController,private toastCtrl:ToastController) { }

  ngOnInit() {
    this.citoyen=this.tokenService.getUser()
    this.imgChosed=this.citoyen.photo

    this.getUser()

  }

  getUser(){
    this.sbJoueurService.GetByTelephone(this.citoyen.telephone).subscribe(res=>{
      this.user=res.data
      console.log(this.user)
    })
  }


  //////
  clickFile(){
   var input=<HTMLIonCardElement>document.querySelector('.fileselect')
    input.click();
  }
  changeFile(e:any){
    //verification si une photo a été choisie ou pas
    if(!e.target.files[0] || e.target.files[0].length==0){
      this.message="Vous devez choisir une image !";
      this.erreur=true;
      return;
    }

    //verification du type de fichier choisi pour recaler si ce n'est pas une photo
    var typeFichier=e.target.files[0].type;
    //this.imgChosed=e.target['files'];


    if(e.target.files){
      var reader= new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.message="";
        this.imgChosed=event.target.result;
        this.fichier=e.target['files'][0];
      }
    }
  }

  ///creation de compte
  update($event:any){
    //this.router.navigate(['/tabs'])
    if(this.user.nom==this.citoyen.nom && this.user.username==this.citoyen.username&& this.user.email==this.citoyen.email && this.citoyen.photo==this.citoyen.photo){
      this.presentToastError()
    }else{
      var url=''
      if(this.fichier==null){
        url=this.user.photo
        this.MiseAJour(url)
      }else{
        this.pushFileToStorageAudio(this.fichier)
      }
    }

  }

  //
   //upload de fichier
   pushFileToStorageAudio(fileUpload: Fichier): Observable<any> {
    const filePath = `Fichiers/Profil/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log(downloadURL)
          // fileUpload.url = downloadURL;
          // fileUpload.name = fileUpload.file.name;
          this.MiseAJour(downloadURL)

        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }
  //
  MiseAJour(url:any){
    this.isErrorBack=false
    this.afAuth.authState.subscribe(auth => {
      //console.log(auth?.uid)
      //recuperation des preferences du user stoke ds le local stotege
      var table=JSON.parse(localStorage.getItem('preferences')!) || []
      //
      this.user.nom=this.citoyen.nom
      this.user.username=this.citoyen.username
      this.user.email=this.citoyen.email

      var citoyen=[this.user]



        console.log(citoyen)

        this.sbJoueurService.update(citoyen).subscribe(data=>{
          console.log(data)
          if(data.message=='ok'){
            this.loginService.login(this.username,auth?.uid).subscribe(res=>{
              console.log(res.accessToken)
              this.tokenService.signOut()
              this.tokenService.saveToken(res.token);
              this.tokenService.saveRefreshToken(res.refreshToken)
              this.tokenService.saveUser(res);
                var user={
                  'id':auth?.uid,
                  'numero':auth?.phoneNumber,
                  'username':res.username,
                  "preferences":table
                }

                //voir si l'utilisateur n'a pas deja un compte
                this.fbJoueurService.get(auth?.uid).subscribe(res2=>{
                  console.log(res2)

                  if(res2){
                    this.fbJoueurService.update(auth?.uid,user)
                    console.log('hello')
                  }
                  //this.router.navigate(['../tabs'])
                  this.presentToast()

                })

            },error=>{
              console.log(error)
            })
          }else{
            //console.log(data)
            this.isErrorBack=true
            this.erreurBack=data.data
          }

        },error=>{
          console.log(error.error)
          this.isErrorBack=true
          this.erreurBack=error.error.data
        })
      });

  }


  //
  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Modification effectuée avec success !',
      duration: 2000,
      position: 'top',
      cssClass: 'custom-toast',
      mode:'ios'
    });

    toast.onDidDismiss();

    toast.present();
  }

  async presentToastError() {
    let toast = await this.toastCtrl.create({
      message: 'Veuillez modifier des champs avant de cliquer sur le bouton !',
      duration: 2000,
      position: 'top',
      cssClass: 'custom-toast',
      mode:'ios'
    });

    toast.onDidDismiss();

    toast.present();
  }


}
