import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedGame } from './featured-game';

describe('FeaturedGame', () => {
  let component: FeaturedGame;
  let fixture: ComponentFixture<FeaturedGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedGame],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
