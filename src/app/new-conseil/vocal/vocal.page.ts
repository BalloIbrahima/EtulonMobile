import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { GestureController } from '@ionic/angular';
import { GenericResponse, RecordingData, VoiceRecorder } from 'capacitor-voice-recorder';
import { read } from 'fs';

@Component({
  selector: 'app-vocal',
  templateUrl: './vocal.page.html',
  styleUrls: ['./vocal.page.scss'],
})
export class VocalPage implements OnInit, AfterViewInit{



  PlayDuration: any='';
  durre:any=0
  audios: any=[];
  recording=false;
  @ViewChild('recordbtn',{ read:ElementRef}) recordbtn:ElementRef

  constructor(private gestureCtrl:GestureController  ) { }

  ngOnInit() {
    VoiceRecorder.canDeviceVoiceRecord().then((result: GenericResponse) => console.log(result.value))

    this.loadFile();
    //demande dautorisation
    VoiceRecorder.requestAudioRecordingPermission().then((result: GenericResponse) => console.log(result.value))
    VoiceRecorder.hasAudioRecordingPermission().then((result: GenericResponse) => console.log(result.value))

    //VoiceRecorder.requestAudioRecordingPermission()
  }

  ngAfterViewInit(): void {
    // const longPress=this.gestureCtrl.create({
    //   el:this.recordbtn.nativeElement,
    //   threshold:0,
    //   gestureName:'long-press',
    //   onStart: ev=>{
    //     Haptics.impact({style:ImpactStyle.Light})
    //     this.Record();
    //     this.CalculDuree();
    //   },
    //   onEnd: ev=>{
    //     this.StopRecord();
    //     Haptics.impact({style:ImpactStyle.Light})
    //   }
    // },true)

    // longPress.enable();
  }




  //enregistrement du vocal
  Record(){
    //change  btn style
    var btn= <HTMLDivElement>document.querySelector('.iconSaver')
    btn.classList.add('recording')
    //
    this.recording=true
    VoiceRecorder.startRecording()
    .then((result: GenericResponse) => console.log(result.value))
    .catch(error => console.log(error))

   //VoiceRecorder.startRecording()

  }

  ///stop de l'enregistrement
  StopRecord() {
    if(!this.recording){
      this.Record()
    }else{
      VoiceRecorder.stopRecording().then(async (result:RecordingData) =>{
        //change btn style
        var btn= <HTMLDivElement>document.querySelector('.iconSaver')
        btn.classList.add('recording')
        //
        this.recording=false
        if(result.value && result.value.recordDataBase64){
          const recordData=result.value.recordDataBase64;

          const fileName='audio'+'.wav';

          await Filesystem.writeFile({
            path:fileName,
            directory:Directory.Data,
            data:recordData

          })

          this.loadFile()
        }

      })
    }


  }


  //calcul de la durree du vocal
  CalculDuree() {
    if(this.recording){
      this.durre=0;
      this.PlayDuration='';
      return

    }

    this.durre+=1;
    const minute=Math.floor(this.durre/60);
    const second=(this.durre%60).toString().padStart(2,'0');

    this.PlayDuration=`${minute}:${second}`;
    setTimeout(() => {
      this.CalculDuree()
    }, 1000);
  }

  //lecture du fichier enregistre
  async PlayFile(fileName:any) {

    console.log(fileName)
    const audioFile=await Filesystem.readFile({
      path:fileName,
      directory:Directory.Data
    })

    const base64Sound=audioFile.data;

    const audioRef=new Audio(`data:audio/aac;base64,${base64Sound}`)
    audioRef.oncanplaythrough=()=>audioRef.play();
    audioRef.load();
  }

  //recuperation des fichiers enregistres
  loadFile() {
    Filesystem.readdir({
      path:'',
      directory:Directory.Data
    }).then(result =>{
      console.log(result.files)
      this.audios=result.files;
    })
  }

}
