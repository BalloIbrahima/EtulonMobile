import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConseilService } from 'src/app/services/conseil/conseil.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-conseil',
  templateUrl: './conseil.page.html',
  styleUrls: ['./conseil.page.scss'],
})
export class ConseilPage implements OnInit {
  citoyen:any
  conseils:any=[]

  nombreComseil:any=0
  constructor(private router:Router,private tokenService:TokenService, private conseilService:ConseilService) { }

  ngOnInit() {
    this.citoyen=this.tokenService.getUser()
    this.GetConseilsParInrterets()
    this.GetNombreConseil()
  }

  like(){

  }

  Addconseil(){
    console.log('dddd')
    this.router.navigate(['/new-conseil'])
  }


  GetConseilsAll(){
    this.conseilService.getAll().subscribe(res=>{
      this.conseils=res.data
    })
  }

  GetConseilsParInrterets(){
    this.conseilService.GetParInteret(this.citoyen.id).subscribe(res=>{
      console.log(res)
      this.conseils=res.data
    })
  }

  GetNombreConseil(){
    this.conseilService.GetNombreConseilForUser(this.citoyen.id).subscribe(res=>{
      this.nombreComseil=res.data
    })
  }



  mesCouleurs=[
    {
      'couleur':'#008000'
    },
    {
      'couleur':'#3779FF'
    },
    {
      'couleur':'#BB7676'
    },
    {
      'couleur':'#FF981F'
    },
    {
      'couleur':'#F75555'
    },
    {
      'couleur':'#000000'
    }
  ]

  randomize(tab:any) {
    var i, j, tmp;
    for (i = tab.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = tab[i];
        tab[i] = tab[j];
        tab[j] = tmp;
    }
    return tab;
  }

  getRandomArbitrary(min:number, max:number):number {
    console.log(Math.round(Math.random() * (max - min) + min))
    var number=Math.round(Math.random() * (max - min) + min)
    return number;
  }

}
