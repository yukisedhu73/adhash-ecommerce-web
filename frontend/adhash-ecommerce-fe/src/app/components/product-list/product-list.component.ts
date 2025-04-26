// src/app/components/product-list/product-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // since you are using router.navigate

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() isAdmin: boolean = false;
  @Output() pageChange = new EventEmitter<number>();

  pages = [1, 2, 3]; // Hardcoded for simplicity

  constructor(private router: Router) {}

  viewDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  onPageSelect(page: number) {
    this.pageChange.emit(page);
  }
}
