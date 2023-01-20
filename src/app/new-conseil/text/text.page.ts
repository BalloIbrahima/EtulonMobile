import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.page.html',
  styleUrls: ['./text.page.scss'],
})
export class TextPage implements OnInit {

  description:any;
  colorChosed:any='#008000'
  constructor() { }

  ngOnInit() {
  }

  //changement de couleur
  changeColor(color:String){
    this.colorChosed=color
  }

  //publication
  Publie(){

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
