import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  utenti: any[] = [];

  constructor(private router: Router) {
    // Controlla se ci sono dati passati tramite stato
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.utenti = navigation.extras.state['utenti'] || [];
    }
  }
}
