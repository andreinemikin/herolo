import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePromtComponent } from './delete-promt.component';

describe('DeletePromtComponent', () => {
  let component: DeletePromtComponent;
  let fixture: ComponentFixture<DeletePromtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePromtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePromtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
