import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { CameraService } from '../services/camera/camera.service';

@Component({
  selector: 'app-new-conseil',
  templateUrl: './new-conseil.page.html',
  styleUrls: ['./new-conseil.page.scss'],
})
export class NewConseilPage implements OnInit {

  constructor(private actionSheetCtrl:ActionSheetController, private photoService:CameraService) { }

  ngOnInit() {
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
}
