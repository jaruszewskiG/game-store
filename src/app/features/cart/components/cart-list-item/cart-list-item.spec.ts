import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartListItemComponent } from './cart-list-item';

describe('CartListItemComponent', () => {
  let component: CartListItemComponent;
  let fixture: ComponentFixture<CartListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
