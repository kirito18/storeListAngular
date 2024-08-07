import { CartService } from './../../../shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { Component, inject, Input, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export default class ProductDetailComponent {

  @Input() id?: string;
  product = signal<Product | null>(null);
  cover = signal('');
  private ProductService = inject(ProductService);
  private CartService = inject(CartService);


  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.id) {
      this.ProductService.getOne(this.id)
      .subscribe({
        next: (product) =>{
          this.product.set(product);
          if (product.images.length > 0) {
            this.cover.set(product.images[0]);
          }
        }
      })
    }
  }

  changeCover(newImg: string){
      this.cover.set(newImg);
  }

  addToCart(){
    const product = this.product();
    if (product) {
      this.CartService.addToCart(product);
    }

  }
}
