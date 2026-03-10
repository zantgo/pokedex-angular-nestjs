import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideHttpClient } from '@angular/common/http';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient()] // Necesario porque App inyecta PokedexService
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the table', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges(); // Ejecuta ngOnInit
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    // Ahora verificamos que exista la tabla en lugar del H1 antiguo
    expect(compiled.querySelector('table')).toBeTruthy();
  });
});
