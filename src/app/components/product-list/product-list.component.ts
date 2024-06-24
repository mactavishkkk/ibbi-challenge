import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ImageModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: any[] = [];
  categories: any[] = [];
  searchCategory: number | undefined;
  searchDescription: string = '';
  skip: number = 0;
  limit: number = 10;

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getAllProducts(this.skip, this.limit, this.searchCategory, this.searchDescription)
      .subscribe(
        (response: any) => {
          this.products = response;
        },
        (error: any) => {
          console.error('Error fetching products:', error);
        }
      );
  }

  loadCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(
        (response: any) => {
          this.categories = response;
        },
        (error: any) => {
          console.error('Error fetching categories:', error);
        }
      );
  }

  onSearch(): void {
    this.skip = 0;
    this.loadProducts();
  }

  onNextPage(): void {
    this.skip += this.limit;
    this.loadProducts();
  }

  onPrevPage(): void {
    this.skip -= this.limit;
    if (this.skip < 0) {
      this.skip = 0;
    }
    this.loadProducts();
  }

  getImageUrl(image: string | null): string {
    return `http://localhost:8001/products/images/${image}`;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'yellow':
        return 'status-yellow';
      case 'green':
        return 'status-green';
      case 'red':
        return 'status-red';
      default:
        return '';
    }
  }

  createProduct(): void {
    this.router.navigate(['/products/create']);
  }

  editProduct(product: any): void {
    // this.router.navigate(['/products/edit', product.id]);
  }

  deleteProduct(id: number): void {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}
