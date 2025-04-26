import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

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

  pages = [1, 2, 3];

  constructor(private router: Router, private location: Location) {}

  viewDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  onPageSelect(page: number) {
    this.pageChange.emit(page);
  }

  getLocalImage(imageurl: string): string {
    if (!imageurl) {
      return 'assets/product-images/default.jpeg';
    }
  
    const parts = imageurl.split('/');
    const fileName = parts[parts.length - 1];
    
    return `assets/product-images/${fileName}.jpeg`;
  }

  goBack(): void {
    this.location.back();
  }

  navigateToAdd(): void {
    this.router.navigate(['/admin/add-product']);
  }

  navigateToUpdate(id: number): void {
    this.router.navigate(['/admin/edit-product', id]);
  }
}
