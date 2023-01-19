import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game2',
  templateUrl: './game2.page.html',
  styleUrls: ['./game2.page.scss'],
})
export class Game2Page implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

   //
   Play(){
    //console.log('gooooo')
    this.router.navigate(['/game2'])
  }

}
