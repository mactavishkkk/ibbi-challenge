import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { ProductCreateDTO } from '../../models/product.model';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  product: ProductCreateDTO = {
    name: '',
    description: '',
    value: 0,
    dolarValue: 0,
    quantity: 0,
    status: 'status',
    image: 'image',
    category_id: 0
  };

  dollarRate: number = 0;
  categories: Category[] = [];
  selectedFile: File | null = null;

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getDollarRate().subscribe((data) => {
      this.dollarRate = data.rates.BRL;
    });

    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  convertToDollar() {
    return this.product.value / this.dollarRate;
  }

  saveProduct() {
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

    this.productService.createProduct(formData).subscribe(() => {
      alert('Produto criado com sucesso!');
      this.router.navigate(['/products']);
    });

  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
