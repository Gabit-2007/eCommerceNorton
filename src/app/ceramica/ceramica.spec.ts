import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ceramica } from './ceramica';

describe('Ceramica', () => {
  let component: Ceramica;
  let fixture: ComponentFixture<Ceramica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ceramica],
    }).compileComponents();

    fixture = TestBed.createComponent(Ceramica);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
