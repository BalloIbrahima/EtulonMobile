import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  check(numero:any){
   var checkbox= <HTMLIonCheckboxElement>document.querySelector('#card'+numero)
   var card=<HTMLIonCardElement>document.querySelector('.card'+numero)

   if(checkbox.checked==true){
    card.style.border='4px solid white'
   }
   else{
    card.style.border='4px solid green'
   }
   checkbox.checked=!checkbox.checked
  }

  //
  goToNextPage(){
    //console.log('gooooo')
    this.router.navigate(['/login'])
  }

}
