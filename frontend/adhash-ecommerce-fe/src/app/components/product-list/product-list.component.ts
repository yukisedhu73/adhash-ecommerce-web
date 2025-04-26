import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { PaginationComponent } from '../pagination/pagination.component' // Import the new pagination component

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent], // Add PaginationComponent here
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  @Input() isAdmin: boolean = false;

  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 1;
  totalPages: number[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.setupPagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.setupPagination();
    }
  }

  setupPagination() {
    const total = Math.ceil(this.products.length / this.itemsPerPage);
    this.totalPages = Array.from({ length: total }, (_, i) => i + 1);
    this.currentPage = Math.min(this.currentPage, this.totalPages.length || 1);
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(start, end);
  }

  onPageSelect(page: number) {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  onPageSizeChange(newSize: number) {
    this.itemsPerPage = newSize;
    this.setupPagination(); // Update pagination with the new page size
  }
  

  viewDetails(id: number) {
    this.router.navigate(['/product', id]);
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
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          console.log('Product deleted successfully.');
          this.products = this.products.filter(p => p.id !== id);
          this.setupPagination();
        },
        error: (err: any) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, 1);
  }
}
