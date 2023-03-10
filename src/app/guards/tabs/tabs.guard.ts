import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class TabsGuard implements CanActivate {

  constructor(private router:Router,private tokenService:TokenService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      var citoyen=this.tokenService.getUser()
      console.log(citoyen)
      if(!citoyen.id){

        this.router.navigate(['/inscription'])
        return false;
      }else{
        return true;
      }

  }

}
