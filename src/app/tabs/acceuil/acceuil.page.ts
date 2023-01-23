import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProblematiqueService } from 'src/app/services/problematique/problematique.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})
export class AcceuilPage implements OnInit {

  problematiques:any=[];

  constructor(private router:Router,private problematiqueService:ProblematiqueService) { }

  ngOnInit() {

    this.problematiqueService.getAll().subscribe(res=>{
      this.problematiques=res.data;
      localStorage.setItem('listProblematique',JSON.stringify(res.data))
      //console.log(this.problematiques)
    },error=>{
      //console.log(JSON.parse(localStorage.getItem('listProblematique') || '') )
      this.problematiques= JSON.parse(localStorage.getItem('listProblematique') || '')
    })
  }

  change(libelle:any){
    var div= <HTMLDivElement>document.querySelector('.'+libelle)
    var divdja= <HTMLDivElement>document.querySelector('.select')
    divdja.classList.remove('select')
    div.classList.add('select')
    if(libelle=='all'){

    }else if(libelle==''){

    }

  }

  //
  goPlay(){
    //console.log('dfgh')
    this.router.navigate(['../game1'])
  }

}
