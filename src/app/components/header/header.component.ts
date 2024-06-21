import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public authService: AuthService) { }
  
  userLogged = this.authService.userLogeddIn();

  logout() {
    this.authService.logout();
  }

  isLogged() {
    return this.authService.isLoggedIn();
  }
}
