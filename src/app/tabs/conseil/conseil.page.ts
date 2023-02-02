import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ConseilService } from 'src/app/services/conseil/conseil.service';
import { LikeService } from 'src/app/services/like/like.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-conseil',
  templateUrl: './conseil.page.html',
  styleUrls: ['./conseil.page.scss'],
})
export class ConseilPage implements OnInit {
  citoyen:any
  conseils:any=[]
  today=new Date();

  counter:any

  mesLikes:any=[]
  nombreComseil:any=0
  constructor(private router:Router,private tokenService:TokenService, private conseilService:ConseilService,
    public platform: Platform, private likeService:LikeService) {

    }


  ngOnInit() {
    this.citoyen=this.tokenService.getUser()
    this.GetConseilsParInrterets()
    this.GetNombreConseil()

    this.mesJaimes()
  }

  like(i:number,idConseil:any){

    var element=<HTMLDivElement>document.querySelector('.liked'+i)
    if(element.classList.contains('cliked')){
      element.classList.remove('cliked')
      this.likeService.delete(this.citoyen.id,idConseil).subscribe(retour=>{

      })
    }else{
      var like=[{
        'conseil':{
          'id':idConseil
        },
        'user':{
          'id':this.citoyen.id
        }
      }]
      this.likeService.create(like).subscribe(res=>{

      })
      this.PlayFile('assets/son/pick-92276.mp3',null)
      element.classList.add('cliked')
    }


  }

  Addconseil(){
    console.log('dddd')
    this.router.navigate(['/new-conseil'])
  }


  GetConseilsAll(){
    this.conseilService.getAll().subscribe(res=>{
      this.conseils=res.data
    })
  }

  GetConseilsParInrterets(){
    this.conseilService.GetParInteret(this.citoyen.id).subscribe(res=>{
      console.log(res)
      this.conseils=res.data

      for(let i=1;i<=this.conseils.length;i++){
        for(let j=0;j<this.mesJaimes.length;j++){
          if(this.conseils[i]==this.mesLikes[i].conseil){
            this.addJaime(i)
          }
        }

      }
    })
  }

  GetNombreConseil(){
    this.conseilService.GetNombreConseilForUser(this.citoyen.id).subscribe(res=>{
      this.nombreComseil=res.data
    })
  }

  Play(i:any){
    var doc=<HTMLElement>document.querySelector('.none'+i)
    var vue=<HTMLElement>document.querySelector('.play'+i)

    doc.classList.remove('none'+i)
    doc.classList.remove('d-none')
    doc.classList.add('play'+i)


    vue.classList.add('d-none')
    vue.classList.add('none'+i)
    vue.classList.remove('play'+i)

  }



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

  randomize(tab:any) {
    var i, j, tmp;
    for (i = tab.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = tab[i];
        tab[i] = tab[j];
        tab[j] = tmp;
    }
    return tab;
  }

  getRandomArbitrary(min:number, max:number):number {
    console.log(Math.round(Math.random() * (max - min) + min))
    var number=Math.round(Math.random() * (max - min) + min)
    return number;
  }

  //Play audio
  //lecture du fichier audio
  playIcon='play'
  audioValue=0.5
  get_duration_interval:any
  duration:any
  // file: MediaObject;
  curr_playing_file:any
  position:any
  display_duration:any
  get_position_interval:any
  display_position:any


   //lecture du fichier enregistre
   async PlayFile(fileName:any,i:any) {

    var durre=0;
    var total=0
    if(fileName!=null){
      try {
        this.Play(i)
      } catch (error) {

      }
      console.log(fileName)

      // if(this.isPlaying){

      // }else{
        //const audioRef=new Audio(`data:audio/aac;base64,${fileName}`)

      const audioRef=new Audio(`${fileName}`)
      audioRef.oncanplaythrough=()=>audioRef.play();

      audioRef.load();
      //this.counter=
      total=audioRef.duration
      durre=audioRef.duration

      var currentMinute=<HTMLParagraphElement>document.querySelector('.audio'+i)
      currentMinute.textContent=audioRef.currentTime+''

    }



    var audio=<HTMLIonProgressBarElement>document.querySelector('.audio'+i)

    durre-=1
    audio.value=1 - (durre/(total+1))
    setTimeout(() => {
      this.PlayFile(null,i)
    }, 1000);


  }



  //lecture du fichier enregistre
  // async PlayFile(fileName:any,i:any) {

  //   this.Play(i)
  //   console.log(fileName)
  //   // const audioFile=await Filesystem.readFile({
  //   //   path:fileName,
  //   //   directory:Directory.Data
  //   // })

  //   // const base64Sound=fileName.data;

  //   const audioRef=new Audio(`data:audio/aac;base64,${fileName}`)
  //   audioRef.oncanplaythrough=()=>audioRef.play();
  //   audioRef.load();
  // }

  dateDiff(date1:any , date2:any){

    date1=new Date(date1)

    // console.log(date1)
    // console.log(date2)


    var diff:any = {} ;                          // Initialisation du retour
    var tmp = date2 - date1;

    // console.log(tmp)

    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes

    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes

    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures

    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp;

    if (diff.day==0){
      if(diff.hour==0){
        if(diff.min==0){
          return "A l'instant "
        }else{
          if(diff.min>1){
            return "Il y'a "+ diff.min +' minutes'

          }else{
            return "Il y'a "+ diff.min +' minute'

          }
        }
      }else{
        if(diff.hour>1){
          return "Il y'a "+ diff.hour +' heures'
        }else{
          return "Il y'a "+ diff.hour +' heure'
        }
      }

    }else{
      if(diff.day>30){
        // return "Il y'a "+ date1
        return date1
      }else if(diff.day>1){
        return "Il y'a "+ diff.day +' jours'
      }
      else{
        return "Il y'a "+ diff.day +' jour'
      }
    }
  }


  // audioVAlues(i:any){
  //   var audio=<HTMLIonProgressBarElement>document.querySelector('.audio'+i)
  //   audio.value=1 - (this.counter/(this.quizList[this.currentQuiz].timer+1))

  //   this.counter-=1

  //   setTimeout(() => {
  //     this.audioVAlues(i)
  //   }, 1000);
  // }

  mesJaimes(){
    this.likeService.getUsersLikes(this.citoyen.id).subscribe(res=>{
      this.mesJaimes=res.data
    })
  }

  addJaime(i:any){
    var element=<HTMLDivElement>document.querySelector('.bdy'+i)
    element.classList.add('cliked')
  }

}
