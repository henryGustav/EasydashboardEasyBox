import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVariantComponent } from './view-variant.component';

describe('ViewVariantComponent', () => {
  let component: ViewVariantComponent;
  let fixture: ComponentFixture<ViewVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
