import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.page.html',
  styleUrls: ['./home1.page.scss'],
})
export class Home1Page implements OnInit {

  constructor(private router:Router,) { }

  ngOnInit() {
  }

  //
  goToNextPage(){
    //console.log('gooooo')
    this.router.navigate(['/home2'])
  }
}
