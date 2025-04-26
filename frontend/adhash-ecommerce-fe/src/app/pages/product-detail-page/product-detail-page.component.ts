// product-detail-page.component.ts (Parent Component)
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'; // Import the product service
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [ProductDetailComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {
  product: any = {}; // Product data to pass to the child
  productId: number = 0;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the product ID from the URL parameters
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    // Use the service to fetch the product details by ID
    this.productService.getProductById(this.productId).subscribe((product) => {
      this.product = product; // Store the product data
    });
  }

  onAddToCart(event: { product: any, quantity: number }): void {
    console.log('Product added to cart:', event);
    // Handle adding the product to the cart logic, e.g., storing in localStorage
  }
}
