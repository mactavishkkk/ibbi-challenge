import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
  standalone: true,
  imports: [FormsModule, ButtonModule]
})
export class CategoryCreateComponent {
  category: any = {};

  constructor(private categoryService: CategoryService, private router: Router) { }

  saveCategory(): void {
    this.categoryService.createCategory(this.category).subscribe(() => {
      alert('Categoria criada com sucesso!')
      this.router.navigate(['/categories']);
    });
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }
}
