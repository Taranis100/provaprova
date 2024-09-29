import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model'; // Assicurati che il percorso sia corretto
import { AuthService } from '../auth.service'; // Assicurati che il percorso sia corretto

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cognome', 'data_nascita', 'azienda', 'actions'];
  editingUser: User | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      data_nascita: ['', Validators.required],
      azienda: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getLoggedUser().subscribe(loggedUser => {
      this.authService.getUsersByAdmin(loggedUser.username).subscribe(users => {
        this.users = users;
      });
    });
  }

  addUser() {
    this.editingUser = null;
    this.userForm.reset();
  }

  saveUser() {
    if (this.editingUser) {
      // Modifica utente esistente
      this.authService.updateUser(this.editingUser.id, this.userForm.value).subscribe(() => {
        this.loadUsers();
        this.userForm.reset();
      });
    } else {
      // Aggiungi nuovo utente
      this.authService.addUser(this.userForm.value).subscribe(() => {
        this.loadUsers();
        this.userForm.reset();
      });
    }
  }

  editUser(user: User) {
    this.editingUser = user;
    this.userForm.patchValue(user);
  }

  deleteUser(userId: number) {
    this.authService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }

  cancelEdit() {
    this.editingUser = null;
    this.userForm.reset();
  }
}
