import { Component } from '@angular/core';
import { Product, ProductUpdateDTO } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ButtonModule, CommonModule, FormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {
  product: ProductUpdateDTO = {
    id: 0,
    name: '',
    description: '',
    value: 0,
    dolarValue: 0,
    quantity: 0,
    status: 'status',
    image: 'image',
    category_id: 0
  };

  categories: Category[] = [];
  selectedFile: File | null = null;
  dollarRate: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getDollarRate().subscribe((data) => {
      this.dollarRate = data.rates.BRL;
    });

    this.loadProduct(productId);
    this.loadCategories();
  }

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe((product: Product) => {
      this.product = product;
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  convertToDollar() {
    return this.product.value / this.dollarRate;
  }

  saveProduct(): void {
    const formData = new FormData();
    const dolarValue = this.convertToDollar();

    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('value', this.product.value.toString());
    formData.append('dolarValue', dolarValue.toString());
    formData.append('quantity', this.product.quantity.toString());
    formData.append('status', this.product.status);
    formData.append('image', this.product.image);
    formData.append('category_id', this.product.category_id.toString());

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }


    this.productService.updateProduct(this.product.id, formData).subscribe(() => {
      alert('Produto atualizado com sucesso!');
      this.router.navigate(['/products']);
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

}
