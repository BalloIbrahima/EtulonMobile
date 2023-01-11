import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  ///
  message:any
  erreur:any
  fichier:any
  imgChosed:any='assets/images/moi.jpg'

  constructor(private router:Router) { }

  ngOnInit() {

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

  }
}
