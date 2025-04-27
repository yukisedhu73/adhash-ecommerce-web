// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  
  // New: BehaviorSubject to track cart count live
  cartCount$ = new BehaviorSubject<number>(this.calculateCartCount());

  constructor() {}

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(product: Product, quantity: number = 1): void {
    const item = this.cartItems.find(c => c.product.id === product.id);
    if (item) {
      alert('Already added to cart!');
      return;
    } else {
      this.cartItems.push({ product, quantity });
      this.saveCart();
      alert('Product added to cart!');
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(c => c.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.updateCartCount();
  }

  private updateCartCount(): void {
    const count = this.calculateCartCount();
    this.cartCount$.next(count);
  }

  private calculateCartCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}
