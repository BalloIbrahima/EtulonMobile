import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { JeuService } from 'src/app/services/jeux/jeu.service';
import { ProblematiqueService } from 'src/app/services/problematique/problematique.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})
export class AcceuilPage implements OnInit , ViewWillEnter,ViewDidEnter{

  problematiques:any=[];
  citoyen:any
  lastGames:any=[]
  listGame:any=[]

  listLike:any=[]
  listPlay:any=[]
  constructor(private router:Router,private problematiqueService:ProblematiqueService,
    public loadingController: LoadingController,private tokenService:TokenService, private jeuService:JeuService) { }
  ionViewDidEnter(): void {
    // this.ngOnInit()
  }

  ionViewWillEnter(): void {
    // this.ngOnInit()
  }

  ngOnInit() {
    this.presentLoadingWithOptions()
    this.citoyen=this.tokenService.getUser()

    ///
    this.chargeGames(null)
    this.get20last()
    setTimeout(() => {
      this.getNbre()
    }, 1000);
    //
    this.problematiqueService.getAll().subscribe(res=>{
      this.problematiques=res.data;
      localStorage.setItem('listProblematique',JSON.stringify(res.data))
      //console.log(this.problematiques)
    },error=>{
      //console.log(JSON.parse(localStorage.getItem('listProblematique') || '') )
      this.problematiques= JSON.parse(localStorage.getItem('listProblematique') || '')
    })
  }



  change(libelle:any,idP:any){

    if(libelle=='all'){
      var div= <HTMLDivElement>document.querySelector('.cl')
      var divdja= <HTMLDivElement>document.querySelector('.select')
      divdja.classList.remove('select')
      div.classList.add('select')

      this.chargeGames(null)
    }else {
      var div= <HTMLDivElement>document.querySelector('.cl'+idP)
      var divdja= <HTMLDivElement>document.querySelector('.select')
      divdja.classList.remove('select')
      div.classList.add('select')

      var id=0

      this.problematiques.forEach((element: { libelle: any; id: number; }) => {
        if(element.libelle==libelle){

          id=element.id
          console.log(id)
        }

      });
      this.chargeGames(id)
    }

  }

  //
  goPlay(){
    //console.log('dfgh')
    this.router.navigate(['../game1'])
  }


  chargeGames(id:any){
    if(id==null){

      this.jeuService.GetAll().subscribe(res=>{
        console.log(res)
        this.listGame=res.data
        //this.getNbre()
      })

    }else{
      this.jeuService.GetByProb(id).subscribe(res=>{
        console.log(res)
        this.listGame=res.data
        //this.getNbre()
      })
    }

  }


  getNbre(){

    this.listGame.forEach((element: { id: any; }) => {

      this.jeuService.GetNombreDeLike(element.id).subscribe({
        next:res=>{
          console.log(res.data)
          this.listLike.push({
            id:element.id,
            nombre:res.data
          })
        },
        error: err => {
          console.log(err)
          setTimeout(() => {
            this.ngOnInit()
          }, 1000);
        }
      })

      this.jeuService.GetNombreFoisJoue(element.id).subscribe(res=>{
        console.log(res.data)
        this.listPlay.push({
          id:element.id,
          nombre:res.data
        })
      })
      this.dismiss_loader()
    })
  }

    getNbreFoisJoue(id:any){
      var nbre=0
      this.listPlay.forEach((element: { id: any; nombre: number; }) => {
        if(element.id=id){
          nbre=element.nombre
        }

      });

      return nbre;
    }

    getNbreLike(id:any){
      var nbre=0
      this.listLike.forEach((element: { id: any; nombre: number; }) => {
        if(element.id=id){
          nbre=element.nombre
        }
      });

      return nbre;
    }

  //recuperation des derniers jeu
  get20last(){
    this.jeuService.Get20().subscribe(res=>{
      console.log(res)
      this.lastGames=res.data
      //this.getNbre()
    })
  }


  //chargeur
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      id:"loader",
      spinner: "bubbles",

      message: 'Veuillez patientez...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
   }).then(a => {
    a.present().then(() => {

    });
  })

    // return await loading.present();
  }

  async dismiss_loader() {
    console.log('hello')
    return await this.loadingController.dismiss();
  }


}
