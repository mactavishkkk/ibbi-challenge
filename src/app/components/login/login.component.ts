import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        alert('Login efetuado com sucesso!')
        this.cookieService.set('token', response.acess_token);
        this.cookieService.set('user_email', this.email);
        this.router.navigate(['/categories']);
      },
      (error) => {
        this.errorMessage = 'Erro ao efetuar o login, verifique suas credenciais.';
      }
    );
  }
}
