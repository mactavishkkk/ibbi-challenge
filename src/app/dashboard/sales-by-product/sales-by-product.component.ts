import { Component, OnInit } from '@angular/core';
import { ProductSalesData } from './product-sales.interface';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-sales-by-product',
  standalone: true,
  imports: [],
  templateUrl: './sales-by-product.component.html',
  styleUrl: './sales-by-product.component.scss'
})
export class SalesByProductComponent implements OnInit {
  chartData: ProductSalesData[] = [];

  constructor() { }

  ngOnInit(): void {
    this.chartData = [
      { product: "Product A", amount: 1000, colorcode: '#FF6384' },
      { product: "Product B", amount: 900, colorcode: '#36A2EB' },
      { product: "Product C", amount: 800, colorcode: '#FFCE56' },
      { product: "Product D", amount: 700, colorcode: '#4BC0C0' },
      { product: "Product E", amount: 600, colorcode: '#FF3C00' },
      { product: "Product F", amount: 500, colorcode: '#14FE00' },
      { product: "Product G", amount: 400, colorcode: '#BC00FE' },
      { product: "Product H", amount: 300, colorcode: '#FE00B7' },
      { product: "Product I", amount: 200, colorcode: '#000' },
      { product: "Product J", amount: 100, colorcode: '#FFF' },

    ];

    this.RenderChart(this.chartData.map(data => data.product.toString()), this.chartData.map(data => data.amount), this.chartData.map(data => data.colorcode));
  }

  RenderChart(labeldata: any, valuedata: any, colordata: any) {
    const myChart = new Chart('barchart', {
      type: 'bar',
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
