import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JeuService } from 'src/app/services/jeux/jeu.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.page.html',
  styleUrls: ['./jeux.page.scss'],
})
export class JeuxPage implements OnInit {

  citoyen:any

  nbreFoiJoue:any=0
  options={
    slidesPerView:1,   // NOMBRE DE SLIDE PAR PAGE = 1
    centeredSlider:true,
   // loop:true,
    spaceBetween:1,
    autoplay:true
  }

  JeuBestPlayed:any=[]
  preferences:any=[]

  constructor(private router:Router,private tokenService:TokenService,private jeuService:JeuService) { }

  ngOnInit() {
    this.citoyen=this.tokenService.getUser()
    this.Launch()

  }

  Launch(){
    this.jeuService.GetNombreJeuJoue(this.citoyen.id).subscribe(res=>{
      this.nbreFoiJoue=res.data
    })

    this.jeuService.GetBestPlayed().subscribe(res=>{
      this.JeuBestPlayed=res.data
    })


    this.jeuService.getPreferences(this.citoyen.id).subscribe(res=>{
      this.preferences=res.data
    })
  }


  //
  Play(){
    //console.log('dfgh')
    this.router.navigate(['../game1'])
  }

}
