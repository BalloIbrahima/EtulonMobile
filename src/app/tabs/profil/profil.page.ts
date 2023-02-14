import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConseilService } from 'src/app/services/conseil/conseil.service';
import { JeuService } from 'src/app/services/jeux/jeu.service';
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
  nbreFoiJoue: any=0;
  lastgames:any=[]
  listLike:any=[]
  listPlay:any=[]


  constructor(private router:Router,private tokenService:TokenService,private sbJoueurService:SpringJoueurService,private conseilService:ConseilService,private scoreService:ScoreService,private jeuService:JeuService) { }


  citoyen:any
  ngOnInit() {
    this.citoyen=this.tokenService.getUser()
    this.GetScore()
    this.GetTime()
    this.GetNombreConseil()

    this.GetNombreJeuJoue()

    this.GetLastGameList(this.citoyen.id,10)

    setTimeout(() => {
      this.getNbre()
    }, 1000);

  }



  goEdit(){
    this.router.navigate(['/compte'])

  }

  //
  notifPage(){
    this.router.navigate(['/notification'])
  }

  //
  Play(idJeu:any){
    //console.log('dfgh')
    this.router.navigate(['../game1',idJeu])
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

  GetNombreJeuJoue(){
    this.jeuService.GetNombreJeuJoue(this.citoyen.id).subscribe(res=>{
      this.nbreFoiJoue=res.data
    })
  }

  GetLastGameList(id: any, arg1: number) {
    this.jeuService.UserLastGameLikst(id,arg1).subscribe(res=>{
      console.log(res)
      this.lastgames=res.data
    })

  }


  logout(){
    localStorage.clear()
    this.tokenService.signOut()
    this.sbJoueurService.Deconnecter().subscribe(res=>{},error => {});
    this.router.navigate(['/inscription'])
  }


  ///like

  getNbre(){
    this.lastgames.forEach((element: { id: any; }) => {

      this.jeuService.GetNombreDeLike(element.id).subscribe(res=>{
        console.log(res.data)
        this.listLike.push({
          id:element.id,
          nombre:res.data
        })
      })

      this.jeuService.GetNombreFoisJoue(element.id).subscribe(res=>{
        console.log(res.data)
        this.listPlay.push({
          id:element.id,
          nombre:res.data
        })
      })
    })
  }

  getNbreFoisJoue(id:any){
    var nbre=30
    this.listPlay.forEach((element: { id: any; nombre: number; }) => {
      if(element.id=id){
        nbre=element.nombre
      }
    });

    return nbre;
  }

  getNbreLike(id:any){
    var nbre=30
    this.listLike.forEach((element: { id: any; nombre: number; }) => {
      if(element.id=id){
        nbre=element.nombre
      }
    });
    return nbre;
  }
}
