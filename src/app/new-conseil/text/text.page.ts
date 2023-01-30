import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ConseilService } from 'src/app/services/conseil/conseil.service';
import { DataTranfererService } from 'src/app/services/dataTranferer/data-tranferer.service';
import { TokenService } from 'src/app/services/token/token.service';
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

  citoyen:any
  constructor(private tokenService:TokenService, private newConseil: NewConseilPage,private dataTransferService:DataTranfererService, private conseilService:ConseilService,private toastCtrl: ToastController) {
    this.dataTransferService.getObservable().subscribe(res=>{
      console.log(res)
    })
  }

  ngOnInit() {
    this.citoyen=this.tokenService.getUser()
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

    if(problematique.length!=0){
      var conseil=[{
        'contenu':this.description,
        'color':this.colorChosed,
        'type':'TEXT',
        'problematique':{
          'id':problematique
        },
        'user':{
          'id':this.citoyen.id
        },
        'nbreLike':0
      }]

      this.conseilService.Add(conseil).subscribe(data=>{
        console.log(data)
      })
//       Prenons  soin de notre environnement en jetant nos ordures dans les poubelles appropriées .
// Merci 🤩 ☺️ 😊 !
    }else{
      this.presentToast()
    }




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


  //
  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Veuillez selectionner une problematique !',
      duration: 2000,
      position: 'top',
      cssClass: 'custom-toast',
      mode:'ios'
    });

    toast.onDidDismiss();

    toast.present();
  }

}
