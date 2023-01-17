import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.page.html',
  styleUrls: ['./home1.page.scss'],
})
export class Home1Page implements OnInit {

  constructor(private router:Router,) { }

  options:AnimationOptions={
    path:'assets/json/Manfilling.json'
  }

  ngOnInit() {
  }

  //
  goToNextPage(){
    //console.log('gooooo')
    this.router.navigate(['/home2'])
  }
}
