import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpringJoueurService {

  constructor(private http:HttpClient) { }
  private env=environment;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  create(user: any) :Observable<any>{
    //const data:FormData=new FormData();
    //data.append('user', JSON.stringify(user).slice(1,JSON.stringify(user).lastIndexOf(']')));
    const data=JSON.stringify(user).slice(1,JSON.stringify(user).lastIndexOf(']'))
    return this.http.post(`${this.env.api}/user/signup`,data,this.httpOptions);

      //console.log(this.httpOptions)
      // data.append('agent', JSON.stringify(user).slice(1,JSON.stringify(user).lastIndexOf(']')));
      // data.append('client', JSON.stringify(client).slice(1,JSON.stringify(client).lastIndexOf(']')));
  }

  GetByTelephone(telephone:any):Observable<any>{
    return this.http.get(`${this.env.api}/user/getuser/${telephone}`,this.httpOptions);
  }

  //Deconnexion
  Deconnecter():Observable<any>{
    return this.http.post(`${this.env.api}/logout`,null);
  }


}
