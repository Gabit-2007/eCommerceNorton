import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { ResultadoBusca } from './resultado-busca';

describe('ResultadoBusca', () => {
  let component: ResultadoBusca;
  let fixture: ComponentFixture<ResultadoBusca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoBusca],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadoBusca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
