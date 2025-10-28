import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Discount percentage badge component
 * Displays discount percentage in a styled tag
 */
@Component({
  selector: 'app-discount-tag',
  templateUrl: './discount-tag.html',
  styleUrl: './discount-tag.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountTagComponent {
  @Input({ required: true }) discountPercent!: number;
}
