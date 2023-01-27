import { Component, OnInit } from '@angular/core';
import { DataTranfererService } from 'src/app/services/dataTranferer/data-tranferer.service';
import { NewConseilPage } from '../new-conseil.page';

@Component({
  selector: 'app-text',
  templateUrl: './text.page.html',
  styleUrls: ['./text.page.scss'],
})
export class TextPage implements OnInit {

  description:any='';
  colorChosed:any='#008000'

  length:any=150

  constructor(private newConseil: NewConseilPage,private dataTransferService:DataTranfererService) {
    this.dataTransferService.getObservable().subscribe(res=>{
      console.log(res)
    })
  }

  ngOnInit() {
    this.write()
  }

  //changement de couleur
  changeColor(color:String){
    this.colorChosed=color
  }

  //publication
  Publie(){

    var problematique=JSON.parse(localStorage.getItem('problematiquechose')!) || []

    console.log(problematique)

    var conseil=[{
      'contenu':this.description,
      'color':this.colorChosed
    }]

  }

  write(){
    this.length=150-this.description.length
    //console.log(this.length)

    setTimeout(() => {
      this.write()
    }, 1000);
  }

  ///la liste des couleur disponible
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

}
