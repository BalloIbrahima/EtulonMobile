import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  ///bool for quiz
  isText=false;
  isPhoto=false;
  isAudio=true;
  isVideo=false;

  is4=true;
  is2=false
  //
  quizValue:any=0.3;
  constructor() { }

  ngOnInit() {
    this.borderColor=this.mesCouleurs[this.randomIntFromInterval(0,5)].couleur
  }

  //play audio
  //lecture du fichier enregistre
  async PlayFile(fileName:any) {
    console.log(fileName)

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

}
