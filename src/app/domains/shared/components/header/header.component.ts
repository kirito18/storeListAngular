import { CartService } from '@shared/services/cart.service';
import { Product } from '@shared/models/product.model';

import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSiteMenu = signal(true);
  private CartService = inject(CartService);
  cart = this.CartService.cart;
  total = this.CartService.total;
  toogleSideMenu() {
    this.hideSiteMenu.update(prevState => !prevState);
  }

}
