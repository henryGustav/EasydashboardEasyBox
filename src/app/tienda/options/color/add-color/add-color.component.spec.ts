import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColorComponent } from './add-color.component';

describe('AddColorComponent', () => {
  let component: AddColorComponent;
  let fixture: ComponentFixture<AddColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
