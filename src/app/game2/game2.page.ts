import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-game2',
  templateUrl: './game2.page.html',
  styleUrls: ['./game2.page.scss'],
})
export class Game2Page implements OnInit {

  constructor(private router:Router) { }

  compte:AnimationOptions={
    path:'assets/json/Comp 2.json'
  }

  launchCompte=false

  compteNumber=3

  ngOnInit() {
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

}
