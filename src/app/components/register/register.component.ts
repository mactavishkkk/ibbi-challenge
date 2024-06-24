import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    this.authService.register(this.email, this.password).subscribe(
      response => {
        alert('Registrado com sucesso!');
        this.router.navigate(['/login']);
      },
      error => {
        alert('Falha no registro');
        console.error(error);
      }
    );
  }
}
