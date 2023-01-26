import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';
import { TokenService } from '../services/token/token.service';

@Component({
  selector: 'app-game-finish',
  templateUrl: './game-finish.page.html',
  styleUrls: ['./game-finish.page.scss'],
})
export class GameFinishPage implements OnInit {


  url:AnimationOptions={
    path:'assets/json/1.json'
  }

  compte:AnimationOptions={
    path:'assets/json/Comp 2.json'
  }

  launchCompte=false

  compteNumber=3
  PointValue:any=0.5

  citoyen:any
  data:any
  score:any=0

  isLiked:Boolean=false
  constructor(private router:Router,private modalCtrl: ModalController,private tokenService:TokenService) { }

  ngOnInit() {
    this.citoyen=this.tokenService.getUser()
    this.PointValue=(this.data.point/(this.data.TotalPoint+1))

    var sc=this.data.point/100
    this.score= Math.round(sc * 100) / 100
  }

  replay(){
    this.launchCompte=true

    if(this.compteNumber==0){
      this.close('renew')
      this.router.navigate(['/play'])
    }else{
      setTimeout(() => {
        this.compteNumber-=1
        this.replay()
      }, 1000);
    }
    // setTimeout(() => {
    //   this.close()
    //   this.router.navigate(['/play'])
    // }, 3000);

    // setTimeout(() => {
    //     this.compteNumber-=1
    //     this.replay()
    // }, 1000);
  }

  finish(){
    this.close(null)
    this.router.navigate(['/game1'])
  }

  close(message:any) {
    var score={
      'score':this.score,
      'duree':this.data.duree,
      'isLiked':this.isLiked,
      'niveau':{
        'id':this.data.idNiveau
      },
      'user':{
        'id':this.citoyen.id,
      }

    }
    return this.modalCtrl.dismiss(null, message);
  }


  reaction(arg0: number) {
    //throw new Error('Method not implemented.');
    var elementlike= <HTMLDivElement>document.querySelector('.like')
    var elementdislike= <HTMLDivElement>document.querySelector('.dislike')

    if(arg0==1){
      this.isLiked=true
      elementlike.classList.add('btnlikecliquer')
      elementdislike.classList.remove('btndislikecliquer')

    }else{
      this.isLiked=false
      elementlike.classList.remove('btnlikecliquer')
      elementdislike.classList.add('btndislikecliquer')
    }
  }
}
