import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JeuService } from 'src/app/services/jeux/jeu.service';
import { ProblematiqueService } from 'src/app/services/problematique/problematique.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})
export class AcceuilPage implements OnInit {

  problematiques:any=[];
  citoyen:any

  listGame:any=[]
  constructor(private router:Router,private problematiqueService:ProblematiqueService,
    private tokenService:TokenService, private jeuService:JeuService) { }

  ngOnInit() {
    this.citoyen=this.tokenService.getUser().data

    ///
    this.chargeGames(null)
    //
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
      this.chargeGames(null)
    }else {
      var id=0

      this.problematiques.forEach((element: { libelle: any; id: number; }) => {
        if(element.libelle==libelle){
          id=element.id
        }

      });
      this.chargeGames(id)
    }

  }

  //
  goPlay(){
    //console.log('dfgh')
    this.router.navigate(['../game1'])
  }


  chargeGames(id:any){{
    if(id==null){

      this.jeuService.GetAll().subscribe(res=>{
        this.listGame=res.data
      })

    }else{
      this.jeuService.GetByProb(id).subscribe(res=>{
        this.listGame=res.data
      })
    }
  }

  }

}
