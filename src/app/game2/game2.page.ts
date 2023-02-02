import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { JeuService } from '../services/jeux/jeu.service';
import { NiveauService } from '../services/niveau/niveau.service';

@Component({
  selector: 'app-game2',
  templateUrl: './game2.page.html',
  styleUrls: ['./game2.page.scss'],
})
export class Game2Page implements OnInit {


  idNiveau:any
  Niveau:any
  imageNiveau:any=''
  libelleNiveau:any=''
  descriptionNiveau:any=''
  nomJeu:any=''

  id:any
  constructor(private router:Router, private route:ActivatedRoute,private jeuService:JeuService,private niveauService:NiveauService) { }

  compte:AnimationOptions={
    path:'assets/json/Comp 2.json'
  }

  launchCompte=false

  compteNumber=3

  ngOnInit() {
    this.idNiveau=this.route.snapshot.params['id']

    this.niveauService.getNiveauById(this.idNiveau).subscribe(retour=>{
      console.log(retour)
      this.Niveau=retour.data
      this.libelleNiveau=this.Niveau.libelle
      this.imageNiveau=this.Niveau.image
      this.descriptionNiveau=this.Niveau.description
      this.nomJeu=this.Niveau.jeu.nom
      this.id=this.Niveau.id
      ///recuperation des niveaux
      // this.niveauService.GetNiveauPourJeu(this.Jeu.id).subscribe(res=>{
      //   console.log(res)
      //   this.ListNiveau=res.data
      // })
    })
  }

   //
   Play(){
    this.launchCompte=true
    //console.log('gooooo')

    // setTimeout(() => {
    //   this.router.navigate(['/play'])
    // }, 3000);

    if(this.compteNumber==0){
      this.launchCompte=false
      this.router.navigate(['/play'])
    }else{
      setTimeout(() => {
        this.compteNumber-=1
        this.Play()
      }, 1000);
    }
    // setTimeout(() => {
    //   this.close()
    //   this.router.navigate(['/play'])
    // }, 3000);

  }

  back(){
    //console.log('dfgh')
    this.router.navigate(['../tabs'])
  }

}
