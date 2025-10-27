import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-cta-button',
  imports: [],
  templateUrl: './cta-button.html',
  styleUrl: './cta-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaButtonComponent {
  @Input({ required: true }) label: string;

  clicked = output<void>();
}
