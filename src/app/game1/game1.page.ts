import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game1',
  templateUrl: './game1.page.html',
  styleUrls: ['./game1.page.scss'],
})
export class Game1Page implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }


  //
  goToNextPage(){
    //console.log('gooooo')
    this.router.navigate(['/game2'])
  }
}
