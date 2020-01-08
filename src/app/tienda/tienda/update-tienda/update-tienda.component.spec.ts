import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTiendaComponent } from './update-tienda.component';

describe('UpdateCategoriesComponent', () => {
  let component: UpdateTiendaComponent;
  let fixture: ComponentFixture<UpdateTiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
