import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pintura } from './pintura';

describe('Pintura', () => {
  let component: Pintura;
  let fixture: ComponentFixture<Pintura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pintura],
    }).compileComponents();

    fixture = TestBed.createComponent(Pintura);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
