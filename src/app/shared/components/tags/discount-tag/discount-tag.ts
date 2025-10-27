import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-discount-tag',
  imports: [],
  templateUrl: './discount-tag.html',
  styleUrl: './discount-tag.scss',
})
export class DiscountTag {
  @Input() discountPercent!: number;
}
