import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

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

  constructor(private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private location: Location) { }

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

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {  // simple confirmation
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          console.log('Product deleted successfully.');
          this.products = this.products.filter(p => p.id !== id);
        },
        error: (err: any) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, 1); // Always 1 quantity
  }
}
