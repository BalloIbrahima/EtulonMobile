import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventBusService } from './Helpers/EventBusService';
import { TokenService } from './services/token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  eventBusSub?: Subscription;

  constructor(private tokenService: TokenService, private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.tokenService.signOut();
  }
}
