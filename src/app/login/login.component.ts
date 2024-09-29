// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';  // Definizione della proprietà
  password: string = '';  // Definizione della proprietà
  errorMessage: string = '';  // Per memorizzare i messaggi di errore

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(loginForm: any) {
    if (loginForm.valid) {
      this.authService.login(this.username, this.password).subscribe(
        (admin) => {
          console.log('Login successful', admin);
          // Logica per reindirizzare l'admin, ad esempio:
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Credenziali errate. Riprova!'; // Mostra un messaggio di errore
        }
      );
    } else {
      this.errorMessage = 'Compila correttamente il modulo!'; // Controllo di validità del modulo
    }
  }
}
