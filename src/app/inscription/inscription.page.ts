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
  email:null;
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
        "preferences":table
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
}
