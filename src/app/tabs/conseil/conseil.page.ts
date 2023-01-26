import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-conseil',
  templateUrl: './conseil.page.html',
  styleUrls: ['./conseil.page.scss'],
})
export class ConseilPage implements OnInit {
  citoyen:any
  constructor(private router:Router,private tokenService:TokenService) { }

  ngOnInit() {
    this.citoyen=this.tokenService.getUser()

  }

  Addconseil(){
    console.log('dddd')
    this.router.navigate(['/new-conseil'])
  }

}
