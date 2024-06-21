import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8001';

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/token`, { email, password });
  }

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('user_email');
    this.router.navigate(['/login']);
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { email, password });
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  userLogeddIn(): string {
    return this.cookieService.get('user_email');
  }
}
