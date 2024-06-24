import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CategorySalesData } from './category-sales.interface';
Chart.register(...registerables);

@Component({
  selector: 'app-sales-by-category',
  standalone: true,
  imports: [],
  templateUrl: './sales-by-category.component.html',
  styleUrl: './sales-by-category.component.scss'
})
export class SalesByCategoryComponent {
  chartData: CategorySalesData[] = [];

  constructor() { }

  ngOnInit(): void {
    this.chartData = [
      { category: "category A", amount: 100, colorcode: '#FF6384' },
      { category: "category B", amount: 30, colorcode: '#36A2EB' },
      { category: "category C", amount: 50, colorcode: '#FFCE56' },
      { category: "category D", amount: 40, colorcode: '#4BC0C0' },

    ];

    this.RenderChart(this.chartData.map(data => data.category.toString()), this.chartData.map(data => data.amount), this.chartData.map(data => data.colorcode));
  }

  RenderChart(labeldata: any, valuedata: any, colordata: any) {
    const myChart = new Chart('piechart', {
      type: 'pie',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: "",
            data: valuedata,
            backgroundColor: colordata
          }
        ]
      },
      options: {

      }
    });
  }
}
