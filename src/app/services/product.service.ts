import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8001';
  private apiDolarRateUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllProducts(skip: number = 0, limit: number = 10, category_id?: number, description?: string): Observable<any> {
    let params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    if (category_id !== undefined && category_id !== null) {
      params = params.set('category_id', category_id.toString());
    }

    if (description) {
      params = params.set('description', description);
    }

    return this.http.get(`${this.apiUrl}/products/`, { headers: this.getHeaders(), params: params });
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`, { headers: this.getHeaders() });
  }

  getDollarRate(): Observable<any> {
    return this.http.get(this.apiDolarRateUrl);
  }

  createProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/`, formData, { headers: this.getHeaders() });
  }

  updateProduct(id: number, productData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${id}`, productData, { headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders() {
    const token = this.cookieService.get('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
