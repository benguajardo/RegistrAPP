import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrodocentePage } from './registrodocente.page';

describe('RegistrodocentePage', () => {
  let component: RegistrodocentePage;
  let fixture: ComponentFixture<RegistrodocentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrodocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
