import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSenha } from './email-senha';

describe('EmailSenha', () => {
  let component: EmailSenha;
  let fixture: ComponentFixture<EmailSenha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailSenha],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailSenha);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
