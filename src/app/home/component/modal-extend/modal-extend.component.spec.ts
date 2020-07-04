import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExtendComponent } from './modal-extend.component';

describe('ModalExtendComponent', () => {
  let component: ModalExtendComponent;
  let fixture: ComponentFixture<ModalExtendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExtendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
