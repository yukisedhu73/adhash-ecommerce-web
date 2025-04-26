import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent {
  @Output() closeForm = new EventEmitter<void>();

  productForm: FormGroup;
  baseImageUrl = 'https://www.sampleurl/';
  productId: number | null = null; // <-- To detect update mode

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      price: ['', [Validators.required]],
      imageFile: [null, Validators.required],
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe(product => {
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        imageFile: product.imageurl, // Not the actual file but you can disable file upload during edit if you want
      });
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({
        imageFile: file,
      });
    }
  }

  submit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = this.productForm.value;
    let imageUrl = '';

    if (typeof formData.imageFile === 'string') {
      imageUrl = formData.imageFile; // Already uploaded URL
    } else if (formData.imageFile) {
      const filename = formData.imageFile.name.split('.')[0];
      imageUrl = this.baseImageUrl + filename;
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      imageUrl: imageUrl,
    };

    if (this.productId) {
      // Update
      this.productService.updateProduct(this.productId, payload).subscribe((res) => {
        console.log('Product updated successfully:', res);
        this.router.navigate(['/admin']);
      });
    } else {
      // Add
      this.productService.addProduct(payload).subscribe((res) => {
        console.log('Product added successfully:', res);
        this.router.navigate(['/admin']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin']);
  }
}
