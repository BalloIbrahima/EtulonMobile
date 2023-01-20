import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conseil',
  templateUrl: './conseil.page.html',
  styleUrls: ['./conseil.page.scss'],
})
export class ConseilPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  Addconseil(){
    console.log('dddd')
    this.router.navigate(['/new-conseil'])
  }

}
