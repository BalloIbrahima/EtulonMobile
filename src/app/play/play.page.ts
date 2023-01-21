import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { AnimationOptions } from 'ngx-lottie';
import { NiveauService } from '../services/niveau/niveau.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  //
  success:AnimationOptions={
    path:'assets/json/success.json'
  }
  showSuccess=false
  showError=false
  echec:AnimationOptions={
    path:'assets/json/error.json'
  }
  Pointgagne:any=0
  ///bool for quiz
  isText=false;
  isPhoto=false;
  isAudio=true;
  isVideo=false;


  is4=true;
  is2=false
  //

  point:any=0;
  counter:any=0

  quizList:any=[
    {"numero": 0,
      "contenu": "Qu'est ce qui manque a cette poubelle ?",
      "timer": 0,
      "point": 0,
      "type": "",
      "lien": null,
      "reponses": [
        {
          "id": 0,
          "contenu": "",
          "isOk": false,
          "type": "",
          "lien": null
        }
      ]
    }
  ]
  currentQuiz:number=0

  quizValue:any=0;
  constructor(private router:Router, private niveauService:NiveauService) { }

  ngOnInit() {
    this.borderColor=this.mesCouleurs[this.randomIntFromInterval(0,5)].couleur
    this.getNiveau()


    //this.compte(this.quizList[this.currentQuiz].timer)
    ///
    console.log(this.quizList[this.currentQuiz])
    this.counter=this.quizList[this.currentQuiz].timer
    console.log(this.counter)
    console.log(this.currentQuiz)



    setTimeout(() => {
      //console.log(this.quizList[this.currentQuiz])
      this.counter=this.quizList[this.currentQuiz].timer
      //console.log(this.counter)
      //console.log(this.currentQuiz)
      this.Promisee()

    }, 1000);

  }

  giveAwnswer(numero:any){
    numero--
    var reponse=this.quizList[this.currentQuiz].reponses[numero]
    //console.log(reponse)
    if(reponse.isOk==true){
      this.PlayFile('assets/son/ok.wav')
      this.nextQuestion()

    }else{
      this.PlayFile('assets/son/false.wav')
      this.nextQuestion()
    }

  }

  nextQuestion(){
    //this.compte(this.quizList[this.currentQuiz].timer)
    if(this.currentQuiz+1==this.quizList.length){
      this.router.navigate(['/game-finish'])
    }else{
      this.currentQuiz++
      this.counter=this.quizList[this.currentQuiz].timer
      this.Promisee()
    }
  }

  async getNiveau(){
    await this.niveauService.getNiveau(1).subscribe(res=>{
      console.log(res.questions);
      this.quizList=res.questions
    })
  }





  //play audio
  //lecture du fichier enregistre
  async PlayFile(fileName:any) {
    //console.log(fileName)

    if(this.isPlaying){

    }else{
      const audioRef=new Audio(`${fileName}`)
      audioRef.oncanplaythrough=()=>audioRef.play();
      audioRef.load();
      //audioRef.setAttribute()
    }


  }


  ///la liste des couleur disponible
  borderColor='#FF981F'
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

  //random generator between ywo number
  randomIntFromInterval(min:number, max:number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  ////pour l,audio
  @Input() src: string;

  @ViewChild('player') playerElementRef: ElementRef;

  isPlaying = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;

  currentTimeText=''
  durationText=''
  private _player: HTMLAudioElement;

  ngAfterViewInit(): void {
    this._player = this.playerElementRef.nativeElement;
    this._bindPlayerEvents();
  }

  play(): void {
      this._player.paused ? this._player.play() : this._player.pause();
  }

  seek(value:any): void {
      this._player.currentTime = value;
  }

  private _bindPlayerEvents(): void {
      this._player.addEventListener('playing', () => {
          this.isPlaying = true;
      });

      this._player.addEventListener('pause', () => {
          this.isPlaying = false;
      });

      this._player.addEventListener('timeupdate', () => {
          this.currentTime = Math.floor(this._player.currentTime);
          if(this.currentTime>60){
            var quo = Math.floor(this.currentTime/60);
            var rem = this.currentTime%60;
            this.currentTimeText=quo+':'+rem
          }
      });

      this._player.addEventListener('seeking', () => {
          this.isLoading = true;
      });

      this._player.addEventListener('seeked', () => {
          this.isLoading = false;
      });

      this._player.addEventListener('loadstart', () => {
          this.isLoading = true;
      });

      this._player.addEventListener('loadeddata', () => {
          this.isLoading = false;
          this.duration = Math.floor(this._player.duration);
          if(this.duration>60){
            var quo = Math.floor(this.duration/60);
            var rem = this.duration%60;
            this.durationText=quo+':'+rem
          }
      });
  }


  //comptage
  // compte(nbre:any){
  //   setTimeout(() => {
  //     this.nextQuestion()
  //     this.PlayFile('assets/son/timer.wav')
  //   }, nbre*1000);
  // }

  //chaque une seconde
  Promisee(){
    if(this.counter==0){
      this.nextQuestion()
      this.PlayFile('assets/son/timer.wav')
    }else{
      this.counter=this.counter-1;
      //this.quizValue=1 - this.counter/100

      this.quizValue=1 - (this.counter/this.quizList[this.currentQuiz].timer)
      setTimeout(() => {
        this.Promisee()
      }, 1000);
    }

  }
}
