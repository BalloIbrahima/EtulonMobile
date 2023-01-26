import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JeuService } from '../services/jeux/jeu.service';
import { NiveauService } from '../services/niveau/niveau.service';

@Component({
  selector: 'app-game1',
  templateUrl: './game1.page.html',
  styleUrls: ['./game1.page.scss'],
})
export class Game1Page implements OnInit {

  idJeu:any
  Jeu:any
  imageJeu:any=''
  descriptionJeu:any=''
  ListNiveau:any=[]
  constructor(private router:Router, private route:ActivatedRoute,private jeuService:JeuService,private niveauService:NiveauService) { }

  ngOnInit() {
    this.idJeu=this.route.snapshot.params['id']

    this.jeuService.GetJeu(this.idJeu).subscribe(retour=>{
      console.log(retour)
      this.Jeu=retour.data
      this.imageJeu=this.Jeu.image
      this.descriptionJeu=this.Jeu.description
      ///recuperation des niveaux
      this.niveauService.GetNiveauPourJeu(this.Jeu.id).subscribe(res=>{
        console.log(res)
        this.ListNiveau=res.data
      })
    })


  }


  //
  goToNextPage(){
    //console.log('gooooo')
    this.router.navigate(['/game2'])
  }
}
