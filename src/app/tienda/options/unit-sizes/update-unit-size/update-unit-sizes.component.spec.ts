import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUnidadesComponent } from './update-unit-sizes.component';

describe('UpdateUnidadesComponent', () => {
  let component: UpdateUnidadesComponent;
  let fixture: ComponentFixture<UpdateUnidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUnidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
