import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  public photos: Photo[] = [];
  public last_img:any;
  public file:any;
  constructor() { }

  public async addNewToGallery(mode:String) {
    let capturedPhoto=null;
    if(mode=="c"){
      capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100
      });



    }else{
      capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
        quality: 100
      });
    }


    // this.photos.unshift({
    //   filepath: "soon...",
    //   webviewPath: capturedPhoto.webPath
    // });

    // recuperation de la tof
    this.last_img=capturedPhoto.dataUrl


    var image = new Image();

  }
}

// INTERFACE POUR LAFFICHAGE DE LA PHOTO

