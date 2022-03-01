import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from './../../../models/product.model';
import { ProductsService } from './../../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        return this.getProduct(this.productId);
      } else {
        this.goToBack();
      }
    });
  }

  private getProduct(productId: string) {
    this.productsService.getOne(productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: () => {
        this.goToBack();
      },
    });
  }

  goToBack() {
    this.location.back();
  }
}
