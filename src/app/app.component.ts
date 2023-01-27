import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventBusService } from './Helpers/EventBusService';
import { EventData } from './Helpers/EventData';
import { JeuService } from './services/jeux/jeu.service';
import { TokenService } from './services/token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  eventBusSub?: Subscription;

  constructor(private tokenService: TokenService, private eventBusService: EventBusService, private jeuService:JeuService) { }

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });


    this.jeuService.GetAll().subscribe(
      data => {
        console.log('ertyui')
       },
      err => {
        //this.content = err.error.message || err.error || err.message;

        if (err.status === 403)
          this.eventBusService.emit(new EventData('logout', null));
      }
    );
  }

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.tokenService.signOut();
  }
}
