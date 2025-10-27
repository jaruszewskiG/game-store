import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartComponent } from '@features/cart/cart';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  imports: [CartComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {}
