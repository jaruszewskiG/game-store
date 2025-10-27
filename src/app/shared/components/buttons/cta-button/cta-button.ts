import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cta-button',
  imports: [],
  templateUrl: './cta-button.html',
  styleUrl: './cta-button.scss',
})
export class CtaButtonComponent {
  @Input() text!: string;
}
