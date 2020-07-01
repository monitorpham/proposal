import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewProgressComponent } from './modal-view-progress.component';

describe('ModalViewProgressComponent', () => {
  let component: ModalViewProgressComponent;
  let fixture: ComponentFixture<ModalViewProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalViewProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
