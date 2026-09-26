import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Papelaria } from './papelaria';

describe('Papelaria', () => {
  let component: Papelaria;
  let fixture: ComponentFixture<Papelaria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Papelaria],
    }).compileComponents();

    fixture = TestBed.createComponent(Papelaria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
