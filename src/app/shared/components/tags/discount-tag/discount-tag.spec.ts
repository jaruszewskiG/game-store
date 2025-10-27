import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscountTag } from './discount-tag';

describe('DiscountTag', () => {
  let component: DiscountTag;
  let fixture: ComponentFixture<DiscountTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountTag],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscountTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
