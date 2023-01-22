import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-game-finish',
  templateUrl: './game-finish.page.html',
  styleUrls: ['./game-finish.page.scss'],
})
export class GameFinishPage implements OnInit {

  url:AnimationOptions={
    path:'assets/json/bien.json'
  }

  PointValue:any=0.5
  constructor(private router:Router,) { }

  ngOnInit() {
  }

  replay(){
    this.router.navigate(['/game-finish'])
  }

  finish(){
    this.router.navigate(['/game-finish'])
  }

}
