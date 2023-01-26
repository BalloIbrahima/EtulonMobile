import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  constructor(private http:HttpClient,private tokenService:TokenService) { }
  private env=environment;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',Authorization: `Bearer ${this.tokenService.getToken()}`})
  };

  getNiveau(id:any){
    return this.http.get<any>(`assets/json/test.json`)
  }

  GetNiveauPourJeu(idJeu: any) :Observable<any>{

    return this.http.get(`${this.env.api}/jeu/getNiveaux/${idJeu}`,this.httpOptions);
  }
}
