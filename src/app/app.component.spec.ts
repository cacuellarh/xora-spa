import { TEST_PROVIDERS } from '../test-providers';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WHATSAPP_URL } from './site.config';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: TEST_PROVIDERS,
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(`should have the 'xora-spa' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.title).toEqual('xora-spa');
  });

  it('should render the WhatsApp button with the Ixora number', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const href = compiled.querySelector('cc-whatsapp-button a')?.getAttribute('href');
    expect(href).toBe(WHATSAPP_URL);
    expect(href).toContain('phone=573209416091');
  });

  it('should toggle the mobile menu', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[aria-controls=menu-movil]') as HTMLButtonElement;
    expect(button.getAttribute('aria-expanded')).toBe('false');
    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(compiled.querySelector('#menu-movil')).not.toBeNull();
  });
});
