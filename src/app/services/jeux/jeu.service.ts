import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
      import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class JeuService {

  constructor(private http:HttpClient,private tokenService:TokenService) { }
  private env=environment;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',Authorization: `Bearer ${this.tokenService.getToken()}`})
  };

  GetByProb(id: any) :Observable<any>{
    //const data:FormData=new FormData();
    //data.append('user', JSON.stringify(user).slice(1,JSON.stringify(user).lastIndexOf(']')));
    //const data=JSON.stringify(user).slice(1,JSON.stringify(user).lastIndexOf(']'))
    return this.http.get(`${this.env.api}/jeu/getJeux/${id}`,this.httpOptions);

    //console.log(this.httpOptions)
    // data.append('agent', JSON.stringify(user).slice(1,JSON.stringify(user).lastIndexOf(']')));
    // data.append('client', JSON.stringify(client).slice(1,JSON.stringify(client).lastIndexOf(']')));
  }

  GetJeu(id: any) :Observable<any>{

    return this.http.get(`${this.env.api}/jeu/get/${id}`,this.httpOptions);
  }

  GetAll() :Observable<any>{
    console.log(this.httpOptions)

    return this.http.get(`${this.env.api}/jeu/getall`,this.httpOptions);
  }

  Get20() :Observable<any>{
    console.log(this.httpOptions)

    return this.http.get(`${this.env.api}/jeu/getlast`,this.httpOptions);
  }

  GetNombreDeLike(id:any):Observable<any>{
    return this.http.get(`${this.env.api}/jeu/getNbreLike/${id}`,this.httpOptions);
  }

  GetNombreFoisJoue(id:any):Observable<any>{
    return this.http.get(`${this.env.api}/jeu/getNbreFois/${id}`,this.httpOptions);
  }

  GetNombreJeuJoue(idUser:any):Observable<any>{
    return this.http.get(`${this.env.api}/jeu/getNbreJeu/${idUser}`,this.httpOptions);
  }

  UserLastGameLikst(idUser:any,nombre:any):Observable<any>{
    return this.http.get(`${this.env.api}/user/mesderniersjeux/${idUser}/${nombre}`,this.httpOptions);
  }




}
