import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { CameraService } from '../services/camera/camera.service';
import { DataTranfererService } from '../services/dataTranferer/data-tranferer.service';
import { ProblematiqueService } from '../services/problematique/problematique.service';

@Component({
  selector: 'app-new-conseil',
  templateUrl: './new-conseil.page.html',
  styleUrls: ['./new-conseil.page.scss'],
})
export class NewConseilPage implements OnInit {

  private fooSubject = new Subject<any>();

  problematiques:any=[]
  constructor(private actionSheetCtrl:ActionSheetController, private photoService:CameraService,private problematiqueService:ProblematiqueService, private dataTransferService:DataTranfererService) { }

  problematiquechose:any
  ngOnInit() {
    this.getProblematiques()
  }

  changeProblematique(e:any){
    this.problematiquechose=e.detail.value
    console.log(this.problematiquechose)

    var data= {
      'id':'sdfdfdf'
    }

    localStorage.setItem('problematiquechose',JSON.stringify(data))
  }



  //choix camera ou galery
  async presentPhotoActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Ajouter une photo",
      buttons: [{
        text: 'Camera',
        icon: 'camera-outline',
        handler: () => {
          this.photoService.addNewToGallery("c");
          //this.choix=false;
        }
      }, {
        text: 'Galery',
        icon: 'image-outline',
        handler: () => {
          //this.photoService.addNewToGallery("g");
          (<HTMLInputElement>document.getElementById("file_choice")).click()
          //this.onSelectFile(event);
        }
      }]
    });
    await actionSheet.present();
  }

  //getAll problrmatique
  getProblematiques(){
    this.problematiqueService.getAll().subscribe(res=>{
      this.problematiques=res.data;
      console.log(this.problematiques)
    },error=>{
      console.log(error)
    })
  }
}
