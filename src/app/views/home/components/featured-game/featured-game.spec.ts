import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedGameComponent } from './featured-game';

describe('FeaturedGameComponent', () => {
  let component: FeaturedGameComponent;
  let fixture: ComponentFixture<FeaturedGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
