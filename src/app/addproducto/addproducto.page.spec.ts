import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddproductoPage } from './addproducto.page';

describe('AddproductoPage', () => {
  let component: AddproductoPage;
  let fixture: ComponentFixture<AddproductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
