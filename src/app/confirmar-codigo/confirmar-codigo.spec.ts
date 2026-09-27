import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarCodigo } from './confirmar-codigo';

describe('ConfirmarCodigo', () => {
  let component: ConfirmarCodigo;
  let fixture: ComponentFixture<ConfirmarCodigo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarCodigo],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmarCodigo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
