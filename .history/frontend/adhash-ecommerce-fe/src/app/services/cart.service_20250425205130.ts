// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(product: Product, quantity: number): void {
    const item = this.cartItems.find(c => c.product.id === product.id);
    if (item) {
      item.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(c => c.product.id === productId);
    if (item) {
      item.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
