import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sales-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-history.component.html',
  styleUrl: './sales-history.component.scss'
})
export class SalesHistoryComponent {
  sales = [
    {
      date: '01-07-2023',
      time: '14:35',
      description: 'Produto A',
      customer: 'Cliente 1',
      seller: 'Vendedor 1',
      notes: ''
    },
    {
      date: '01-07-2023',
      time: '10:15',
      description: 'Produto B',
      customer: 'Cliente 2',
      seller: 'Vendedor 2',
      notes: 'Entregar para Fulano(a)'
    },
    {
      date: '01-07-2023',
      time: '14:35',
      description: 'Produto C',
      customer: 'Cliente 3',
      seller: 'Vendedor 3',
      notes: ''
    },
    {
      date: '01-07-2023',
      time: '10:15',
      description: 'Produto D',
      customer: 'Cliente 4',
      seller: 'Vendedor 4',
      notes: 'Retirada no balcão'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
