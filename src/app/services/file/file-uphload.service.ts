import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { Fichier } from './file';

@Injectable({
  providedIn: 'root'
})
export class FileUphloadService {

  url:any
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }
  private basePath = '/uploads';


}
