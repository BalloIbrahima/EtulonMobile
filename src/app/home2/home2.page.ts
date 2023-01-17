import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { ProblematiqueService } from '../services/problematique/problematique.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {

  problematiques:any=[];
  constructor(private router:Router,private problematiqueService:ProblematiqueService) {}

  ngOnInit() {
    this.problematiqueService.getAll().subscribe(res=>{
      this.problematiques=res.data;
      console.log(this.problematiques)
    },error=>{
      console.log(error)
    })
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
