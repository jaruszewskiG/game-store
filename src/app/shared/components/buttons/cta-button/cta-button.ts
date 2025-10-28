import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-cta-button',
  templateUrl: './cta-button.html',
  styleUrl: './cta-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaButtonComponent {
  @Input({ required: true }) label!: string;
  @Input() ariaLabel?: string;

  clicked = output<void>();

  getAriaLabel(): string {
    return this.ariaLabel || this.label;
  }
}
