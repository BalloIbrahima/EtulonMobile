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
  preferences:any=[];
  constructor(private router:Router,private problematiqueService:ProblematiqueService) {}

  erreur=''
  isError=false
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
   var i1= <HTMLIonCheckboxElement>document.querySelector('#iok'+numero)
   var i2= <HTMLIonCheckboxElement>document.querySelector('#ino'+numero)
   var img= <HTMLIonCheckboxElement>document.querySelector('#img'+numero)

   if(checkbox.checked==true){
    card.style.backgroundColor='#fff'
    card.style.color='#000'
    //i2.style.color='#fff'
    i2.style.color='#fff'
    i1.classList.remove('d-none')
    i2.classList.add('d-none')
   }
   else{
    card.style.backgroundColor='#008000'
    card.style.color='#fff'
    i1.classList.add('d-none')
    i2.classList.remove('d-none')
    //card.style.border='4px solid green'
   }
   checkbox.checked=!checkbox.checked
  }

  //
  goToNextPage(){
    console.log('i')

    for(let i=0; i<this.problematiques.length;i++){
      var checkbox= <HTMLIonCheckboxElement>document.querySelector('#card'+i)
      if(checkbox.checked){
        this.preferences.push(this.problematiques[i])
      }
    }

    if(this.preferences.length==0){
      this.isError=true
      this.erreur='Veuillez selectionner au moins une problematique .'
    }else{
      localStorage.setItem('preferences',JSON.stringify(this.preferences))
      this.router.navigate(['/login'])
    }

    var table=JSON.parse(localStorage.getItem('preferences')!) || []
    console.log(table)

  }

}
