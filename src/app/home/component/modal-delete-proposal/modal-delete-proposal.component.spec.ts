import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteProposalComponent } from './modal-delete-proposal.component';

describe('ModalDeleteProposalComponent', () => {
  let component: ModalDeleteProposalComponent;
  let fixture: ComponentFixture<ModalDeleteProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
