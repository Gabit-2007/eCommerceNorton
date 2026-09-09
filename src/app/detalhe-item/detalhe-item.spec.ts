import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheItem } from './detalhe-item';

describe('DetalheItem', () => {
  let component: DetalheItem;
  let fixture: ComponentFixture<DetalheItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheItem],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
