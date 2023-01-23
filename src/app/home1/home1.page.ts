import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { LoadingController, ToastController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';
import { TokenService } from '../services/token/token.service';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.page.html',
  styleUrls: ['./home1.page.scss'],
})
export class Home1Page implements OnInit {

  constructor(private router:Router,private loadingController: LoadingController,private tokenService:TokenService,private toastCtrl: ToastController) { }
  etat:boolean
  citoyen:any
  options:AnimationOptions={
    path:'assets/json/Manfilling.json'
  }

  ngOnInit() {
    //localStorage.clear()
    this.presentLoadingWithOptions()
    this.verifie()
    setTimeout(() => {
      if(!this.etat){
        this.presentToast()
      }
    }, 3000);
  }

  //
  goToNextPage(){
    //console.log('gooooo')
    this.router.navigate(['/home2'])
  }

  //
  async verifie(){
    if(this.etat){
      console.log('hello')
      this.dismiss_loader()
      //this.isConnected()
    }else{
      setTimeout(() => {
        this.isOnline()
        this.verifie()
      }, 1000);
    }
  }



  async isOnline(){
    let status = await Network.getStatus();
    this.etat=status.connected
    console.log(this.etat)
    return this.etat
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      id:"loader",
      spinner: "bubbles",

      message: 'Veuillez patientez...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    }).then((a: { present: () => Promise<any>; }) => {
      a.present().then(() => {

      });
    })

  }
  async dismiss_loader() {
    return await this.loadingController.dismiss();
  }

  isConnected(){
    this.citoyen=this.tokenService.getUser().data

    if(this.citoyen){
      console.log(this.citoyen)
    }else{
      console.log('helloe3eee')
      this.router.navigate(['/tabs'])
    }
  }

  //
  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Verifier votre connexion internet !',
      duration: 3000,
      position: 'top',
      cssClass: 'custom-toast',
      mode:'ios'
    });

    toast.onDidDismiss();

    toast.present();
  }

}
