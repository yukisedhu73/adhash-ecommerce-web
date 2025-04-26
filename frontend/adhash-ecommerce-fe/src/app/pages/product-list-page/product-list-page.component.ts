import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [CommonModule, ProductListComponent, RouterModule],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss'
})
export class ProductListPageComponent implements OnInit {
  products: Product[] = [];
  pagedProducts: Product[] = [];
  currentPage = 1;
  pageSize = 4;

  isAdminRoute = false;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isAdminRoute = location.pathname.includes('admin');
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.setPagedProducts();
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.setPagedProducts();
  }

  private setPagedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedProducts = this.products.slice(start, start + this.pageSize);
  }
}
