import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { EventBusService } from '../Helpers/EventBusService';
import { EventData } from '../Helpers/EventData';
import { CameraService } from '../services/camera/camera.service';
import { DataTranfererService } from '../services/dataTranferer/data-tranferer.service';
import { JeuService } from '../services/jeux/jeu.service';
import { ProblematiqueService } from '../services/problematique/problematique.service';

@Component({
  selector: 'app-new-conseil',
  templateUrl: './new-conseil.page.html',
  styleUrls: ['./new-conseil.page.scss'],
})
export class NewConseilPage implements OnInit {

  private fooSubject = new Subject<any>();

  problematiques:any=[]
  constructor(private eventBusService: EventBusService,private actionSheetCtrl:ActionSheetController, private photoService:CameraService,private problematiqueService:ProblematiqueService, private dataTransferService:DataTranfererService, private jeuService:JeuService) { }

  problematiquechose:any
  ngOnInit() {
    localStorage.removeItem('problematiquechose')
    this.getProblematiques()

    this.jeuService.GetAll().subscribe(
      data => {
        console.log('ertyui')
       },
      err => {
        //this.content = err.error.message || err.error || err.message;

        if (err.status === 403)
          this.eventBusService.emit(new EventData('logout', null));
      }
    );
  }

  changeProblematique(e:any){
    this.problematiquechose=e.detail.value
    console.log(this.problematiquechose)


    localStorage.setItem('problematiquechose',JSON.stringify(this.problematiquechose))
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
