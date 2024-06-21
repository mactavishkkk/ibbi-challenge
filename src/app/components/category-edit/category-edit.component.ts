import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [FormsModule, ButtonModule],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent {
  category: any = {};

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.categoryService.getCategoryById(id).subscribe(data => {
      this.category = data;
    });
  }

  saveCategory(): void {
    const id = this.route.snapshot.params['id'];
    this.categoryService.updateCategory(id, this.category).subscribe(() => {
      this.router.navigate(['/categories']);
    });
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }
}
