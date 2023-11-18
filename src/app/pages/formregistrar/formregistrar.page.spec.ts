import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormregistrarPage } from './formregistrar.page';

describe('FormregistrarPage', () => {
  let component: FormregistrarPage;
  let fixture: ComponentFixture<FormregistrarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormregistrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
