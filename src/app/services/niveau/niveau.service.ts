import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  constructor(private http:HttpClient) { }


  getNiveau(id:any){
    return this.http.get<any>(`assets/json/test.json`)
  }
}
