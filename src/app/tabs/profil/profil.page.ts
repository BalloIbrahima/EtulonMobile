import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConseilService } from 'src/app/services/conseil/conseil.service';
import { SpringJoueurService } from 'src/app/services/joueur/spring-joueur.service';
import { ScoreService } from 'src/app/services/score/score.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  nombreComseil: any=0;
  score: any=0;
  time: any=0;
  constructor(private router:Router,private tokenService:TokenService,private sbJoueurService:SpringJoueurService,private conseilService:ConseilService,private scoreService:ScoreService) { }


  citoyen:any
  ngOnInit() {
    this.citoyen=this.tokenService.getUser()
    this.GetScore()
    this.GetTime()
    this.GetNombreConseil()

  }


  goEdit(){
    this.router.navigate(['/compte'])

  }

  //
  notifPage(){
    this.router.navigate(['/notification'])
  }

  //
  Play(){
    //console.log('dfgh')
    this.router.navigate(['../game1'])
  }

  GetNombreConseil(){
    this.conseilService.GetNombreConseilForUser(this.citoyen.id).subscribe(res=>{
      this.nombreComseil=res.data
    })
  }

  GetScore(){
    this.scoreService.getUserScore(this.citoyen.id).subscribe(res=>{
      this.score=res.data
    })
  }

  GetTime(){
    this.scoreService.getUserTime(this.citoyen.id).subscribe(res=>{
      this.time=Math.round((res.data/60) * 100) / 100


    })
  }

  logout(){
    localStorage.clear()
    this.tokenService.signOut()
    this.sbJoueurService.Deconnecter().subscribe(res=>{},error => {});
    this.router.navigate(['/inscription'])
  }
}
