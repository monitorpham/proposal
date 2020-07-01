import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompleteProgressComponent } from './modal-complete-progress.component';

describe('ModalCompleteProgressComponent', () => {
  let component: ModalCompleteProgressComponent;
  let fixture: ComponentFixture<ModalCompleteProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCompleteProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCompleteProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
