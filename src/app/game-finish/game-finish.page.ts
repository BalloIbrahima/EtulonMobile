import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';

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
  constructor(private router:Router,private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  replay(){
    this.launchCompte=true

    if(this.compteNumber==0){
      this.close()
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
    this.close()
    this.router.navigate(['/game1'])
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
