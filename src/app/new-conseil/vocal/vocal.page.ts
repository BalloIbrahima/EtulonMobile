import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { GestureController, ToastController } from '@ionic/angular';
import { GenericResponse, RecordingData, VoiceRecorder } from 'capacitor-voice-recorder';
import { read } from 'fs';
import { Observable, finalize } from 'rxjs';
import { ConseilService } from 'src/app/services/conseil/conseil.service';
import { Fichier } from 'src/app/services/file/file';
import { FileUphloadService } from 'src/app/services/file/file-uphload.service';
import { TokenService } from 'src/app/services/token/token.service';
import { NewConseilPage } from '../new-conseil.page';

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

  Vocal:any=null
  @ViewChild('recordbtn',{ read:ElementRef}) recordbtn:ElementRef

  citoyen:any

  constructor(private gestureCtrl:GestureController ,private toastCtrl: ToastController,private tokenService:TokenService,private router:Router,
     private newConseil: NewConseilPage
    ,private fileUphload:FileUphloadService,private db: AngularFireDatabase, private storage: AngularFireStorage,private conseilService:ConseilService ) { }

  ngOnInit() {
    this.citoyen=this.tokenService.getUser()

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
      this.CalculDuree();
    }else{
      VoiceRecorder.stopRecording().then(async (result:RecordingData) =>{
        //change btn style
        var btn= <HTMLDivElement>document.querySelector('.iconSaver')
        btn.classList.add('recording')
        //
        this.recording=false
        if(result.value && result.value.recordDataBase64){
          const recordData=result.value.recordDataBase64;

          console.log(recordData)

          const fileName='audio'+'.wav';


          //const base64Sound=audioFile.data;

          // const audioRef=new Audio(`data:audio/aac;base64,${base64Sound}`)

          const Name='audio'+new Date()+'.wav';

          this.Vocal=new Fichier(this.dataURLtoFile(`data:audio/aac;base64,${recordData}`,Name))

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
    if(!this.recording){
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



  //save vocal to back

  //publication
  Publie(){

    var problematique=JSON.parse(localStorage.getItem('problematiquechose')!) || []

    console.log(problematique)

    if(problematique.length!=0){
      if(this.Vocal!=null){

        this.pushFileToStorageAudio(this.Vocal, problematique).subscribe(res=>{

        })

      // this.conseilService.Add(conseil).subscribe(data=>{
      //   console.log(data)
      // })
//       Prenons  soin de notre environnement en jetant nos ordures dans les poubelles appropriées .
// Merci 🤩 ☺️ 😊 !


      }else{
        this.presentToastVocal()
      }

    }else{
      this.presentToast()
    }




  }

  //
  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Veuillez selectionner une problematique !',
      duration: 2000,
      position: 'top',
      cssClass: 'custom-toast',
      mode:'ios'
    });

    toast.onDidDismiss();

    toast.present();
  }

  async presentToastVocal() {
    let toast = await this.toastCtrl.create({
      message: 'Veuillez enregistrer un vocal !',
      duration: 2000,
      position: 'top',
      cssClass: 'custom-toast',
      mode:'ios'
    });

    toast.onDidDismiss();

    toast.present();
  }




  //upload de fichier
  pushFileToStorageAudio(fileUpload: Fichier, problematique:any): Observable<any> {
    const filePath = `Fichiers/audio/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log(downloadURL)
          // fileUpload.url = downloadURL;
          // fileUpload.name = fileUpload.file.name;
          // this.saveFileData(fileUpload);
          //this.url= downloadURL
          var conseil=[{
            'lien':downloadURL,
            'type':'AUDIO',
            //'contenu':this.description,
            'color':this.mesCouleurs[this.getRandomArbitrary(1,5)].couleur,
            'problematique':{
              'id':problematique
            },
            'user':{
              'id':this.citoyen.id
            },
            'nbreLike':0
          }]

          // conseil.lien=downloadURL
          // console.log(conseil)

          this.conseilService.Add(conseil).subscribe(res=>{
            console.log(res)
            this.router.navigate(['/tabs/conseil'])

          },error=>{

          })


        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
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


  dataURLtoFile(dataurl:any, filename:any) {

    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type:mime});
}

}


