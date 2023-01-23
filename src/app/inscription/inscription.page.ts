import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
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
  email:any;
  dateNaissance:any;

  ///
  message:any
  erreur:any
  fichier:any
  imgChosed:any='assets/images/moi.jpg'

  erreurBack=''
  isErrorBack=false

  constructor(private router:Router,private fbJoueurService:FirebaseJoueurService,private sbJoueurService:SpringJoueurService,public afAuth: AngularFireAuth,private loginService:LoginService,private tokenStorage:TokenService) { }

  ngOnInit() {

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
    this.isErrorBack=false
    this.afAuth.authState.subscribe(auth => {
      //console.log(auth?.uid)

      var citoyen=[{
        'nom':this.nomComplet,
        'username':this.username,
        'email':this.email,
        'telephone':auth?.phoneNumber,
        'password':auth?.uid
        }]

        console.log(citoyen)

        this.sbJoueurService.create(citoyen).subscribe(data=>{
          console.log(data)
          if(data.message=='ok'){
            this.loginService.login(this.username,auth?.uid).subscribe(res=>{
              console.log(res)
              this.tokenStorage.saveToken(res.accessToken);
              this.tokenStorage.saveUser(res);
              //this.router.navigate(['/dashboard'])
              this.router.navigate(['../tabs'])
            },error=>{})
          }else{
            this.isErrorBack=true
            this.erreurBack=data.data
          }

        },error=>{
          console.log(error)
          this.isErrorBack=true
          this.erreurBack=error.data
        })

        //private fbJoueurService:FirebaseJoueurService,

      });


  }
}
