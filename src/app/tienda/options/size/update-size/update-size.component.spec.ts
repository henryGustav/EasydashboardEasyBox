import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSizeComponent } from './update-size.component';

describe('UpdateSizeComponent', () => {
  let component: UpdateSizeComponent;
  let fixture: ComponentFixture<UpdateSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
