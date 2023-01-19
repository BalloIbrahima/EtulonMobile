import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }


  goEdit(){
    this.router.navigate(['/compte'])

  }
}
