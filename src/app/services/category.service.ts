import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8001';


  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/`, { headers: this.getHeaders() });
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${id}`, { headers: this.getHeaders() });
  }

  createCategory(category: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories/`, category, { headers: this.getHeaders() });
  }

  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/categories/${id}`, category, { headers: this.getHeaders() });
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders() {
    const token = this.cookieService.get('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
