import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Linha } from './linha';

describe('Linha', () => {
  let component: Linha;
  let fixture: ComponentFixture<Linha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Linha],
    }).compileComponents();

    fixture = TestBed.createComponent(Linha);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
