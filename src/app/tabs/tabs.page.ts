import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { EventBusService } from '../Helpers/EventBusService';
import { EventData } from '../Helpers/EventData';
import { CameraService } from '../services/camera/camera.service';
import { DataTranfererService } from '../services/dataTranferer/data-tranferer.service';
import { JeuService } from '../services/jeux/jeu.service';
import { ProblematiqueService } from '../services/problematique/problematique.service';
import { TokenService } from '../services/token/token.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit,ViewWillEnter,ViewDidEnter {

  constructor(private router:Router, private eventBusService: EventBusService,private actionSheetCtrl:ActionSheetController, private photoService:CameraService,private problematiqueService:ProblematiqueService, private tokenService:TokenService, private jeuService:JeuService) { }
  citoyen:any
  ngOnInit(): void {

    this.citoyen=this.tokenService.getUser()
    if(!this.citoyen){
      console.log(this.citoyen)
      this.router.navigate(['/login'])
    }


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

  ionViewDidEnter(): void {
    this.ngOnInit()
  }

  ionViewWillEnter(): void {
    this.ngOnInit()
  }


}
