import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CartStore } from '@stores/cart.store';
import { App } from './app';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [CartStore, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should inject CartStore', () => {
    expect(component.cartStore).toBeDefined();
  });

  it('should render menu component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const menu = compiled.querySelector('app-menu');
    expect(menu).toBeTruthy();
  });

  it('should render home component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const home = compiled.querySelector('app-home');
    expect(home).toBeTruthy();
  });
});
