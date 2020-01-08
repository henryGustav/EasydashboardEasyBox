import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesComponent } from './unit-sizes.component';

describe('UnidadesComponent', () => {
  let component: UnidadesComponent;
  let fixture: ComponentFixture<UnidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
