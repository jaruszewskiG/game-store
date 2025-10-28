import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-discount-tag',
  imports: [],
  templateUrl: './discount-tag.html',
  styleUrl: './discount-tag.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountTagComponent {
  @Input({ required: true }) discountPercent!: number;
}
