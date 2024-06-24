import { Component } from '@angular/core';
import { SalesHistoryComponent } from '../../dashboard/sales-history/sales-history.component';
import { SalesByCategoryComponent } from '../../dashboard/sales-by-category/sales-by-category.component';
import { SalesByProductComponent } from '../../dashboard/sales-by-product/sales-by-product.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SalesHistoryComponent, SalesByCategoryComponent, SalesByProductComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
