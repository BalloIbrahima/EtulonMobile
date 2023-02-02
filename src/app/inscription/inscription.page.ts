import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable, finalize } from 'rxjs';
import { Fichier } from '../services/file/file';
import { FirebaseJoueurService } from '../services/joueur/firebase-joueur.service';
import { SpringJoueurService } from '../services/joueur/spring-joueur.service';
import { LoginService } from '../services/login/login.service';
import { TokenService } from '../services/token/token.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  //user infos
  nomComplet:any;
  username:any;
  email:null;
  dateNaissance:any;

  ///
  message:any
  erreur:any
  fichier:any=null
  imgChosed:any='https://firebasestorage.googleapis.com/v0/b/e-tulon.appspot.com/o/Fichiers%2FProfil%2F663338.png?alt=media&token=f7097766-a5c0-4239-885e-c564a49f1e15'

  erreurBack=''
  isErrorBack=false

  constructor(private router:Router,private fbJoueurService:FirebaseJoueurService,private sbJoueurService:SpringJoueurService,public afAuth: AngularFireAuth,private loginService:LoginService,
    private tokenStorage:TokenService,private db: AngularFireDatabase, private storage: AngularFireStorage,private loadingController: LoadingController,) { }

  ngOnInit() {
    //localStorage.clear()

    this.afAuth.authState.subscribe(auth => {
      console.log(auth?.uid)

      });
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
  singup($event:any){

    if(this.fichier==null){
      this.randomize(this.photosDefault)
      var url=this.photosDefault[0]
      this.inscription(url)
    }else{
      this.pushFileToStorageAudio(this.fichier)
    }



  }


  //upload de fichier
  pushFileToStorageAudio(fileUpload: Fichier): Observable<any> {
    const filePath = `Fichiers/audio/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log(downloadURL)
          // fileUpload.url = downloadURL;
          // fileUpload.name = fileUpload.file.name;
          this.inscription(downloadURL)

        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }


  inscription(url:any){
    this.isErrorBack=false
    this.afAuth.authState.subscribe(auth => {
      //console.log(auth?.uid)
      //recuperation des preferences du user stoke ds le local stotege
      var table=JSON.parse(localStorage.getItem('preferences')!) || []
      //
      var citoyen=[{
        'nom':this.nomComplet,
        'username':this.username,
        'email':this.email,
        'telephone':auth?.phoneNumber,
        'password':auth?.uid,
        "preferences":table,
        'photo':url
        }]

        console.log(citoyen)

        this.sbJoueurService.create(citoyen).subscribe(data=>{
          console.log(data)
          if(data.message=='ok'){
            this.loginService.login(this.username,auth?.uid).subscribe(res=>{
              console.log(res.accessToken)
              this.tokenStorage.saveToken(res.token);
              this.tokenStorage.saveUser(res);
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
                  }else {

                    //this.user=new User(auth.uid,null,null,null,auth.phoneNumber,null,null,null,null,null)
                    this.fbJoueurService.create(user)
                      .then(() => {

                        console.log('after create')
                      }).catch((err:any) => {
                        console.log(err)
                        console.log('iciiii')
                      });
                  }

                  this.router.navigate(['../tabs'])

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
          console.log(error.error.data)
          this.isErrorBack=true
          this.erreurBack=error.error.data
        })


        //this.router.navigate(['/dashboard'])
        //private fbJoueurService:FirebaseJoueurService,

      });

  }


  photosDefault=[
    'https://firebasestorage.googleapis.com/v0/b/e-tulon.appspot.com/o/Fichiers%2FProfil%2F3578878-concept-de-service-de-nettoyage-personnage-de-dessin-anime-joyeux-vectoriel.jpg?alt=media&token=875b7f00-ff99-402e-8459-62c3701a6e95',
    'https://firebasestorage.googleapis.com/v0/b/e-tulon.appspot.com/o/Fichiers%2FProfil%2FDESSIN-HEADER-MOBILE-1920x1061.png?alt=media&token=0eb7e90d-d78d-4f14-a7fd-fa15ec12d2fc',
    'https://firebasestorage.googleapis.com/v0/b/e-tulon.appspot.com/o/Fichiers%2FProfil%2FServices-de-nettoyage-apres-construction.svg?alt=media&token=de004329-256e-4aa9-b25e-080184438ca2',
    'https://firebasestorage.googleapis.com/v0/b/e-tulon.appspot.com/o/Fichiers%2FProfil%2Fillustration-agents.png?alt=media&token=f34ec523-7ff8-4416-9474-68054e5d1762',
    'https://firebasestorage.googleapis.com/v0/b/e-tulon.appspot.com/o/Fichiers%2FProfil%2Fillustration-presta3.png?alt=media&token=c6418018-db5e-41ac-bfdb-9ea3824a519a',
    'https://firebasestorage.googleapis.com/v0/b/e-tulon.appspot.com/o/Fichiers%2FProfil%2Fjeune-homme-avatar-dessin-anime-personnage-photo-profil_18591-55053.avif?alt=media&token=2d97c988-230a-4f89-9118-714cf3be08b5',
    'https://firebasestorage.googleapis.com/v0/b/e-tulon.appspot.com/o/Fichiers%2FProfil%2F663338.png?alt=media&token=f7097766-a5c0-4239-885e-c564a49f1e15',
    'https://firebasestorage.googleapis.com/v0/b/e-tulon.appspot.com/o/Fichiers%2FProfil%2Fimages.png?alt=media&token=4bc233fa-375a-42bc-9c87-c6e160082dd9',
    'https://firebasestorage.googleapis.com/v0/b/e-tulon.appspot.com/o/Fichiers%2FProfil%2Fimages%20(1).png?alt=media&token=da7f52c0-afe0-4a64-8ac1-39daabfde1c5',
    'https://firebasestorage.googleapis.com/v0/b/e-tulon.appspot.com/o/Fichiers%2FProfil%2Fimages%20(2).png?alt=media&token=f2249c7b-2d43-4645-9496-ec23e081d996'
  ]

  //changement couleur des cadres de reponse l;ors du jeu
  randomize(tab:any) {
    var i, j, tmp;
    for (i = tab.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = tab[i];
        tab[i] = tab[j];
        tab[j] = tmp;
    }
    return tab;
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

}
