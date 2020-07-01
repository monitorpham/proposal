import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProposalService } from 'src/app/_services/proposal.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-delete-proposal',
  templateUrl: './modal-delete-proposal.component.html',
  styleUrls: ['./modal-delete-proposal.component.scss']
})
export class ModalDeleteProposalComponent implements OnInit {
  proposal: any;

  constructor(
    private bsModalRef: BsModalRef,
    private toastr : ToastrService,
    private proposalService: ProposalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onDelete(){
    
    this.proposalService.deleteProposal(this.proposal.id).subscribe(res =>{
      console.log(res)
      this.toastr.success("Delete proposal successfully!");
      this.refresh();
    }, err =>{
      console.log(err)
      this.toastr.error(err.message? err.message:  "Delete proposal failed!")
    })
    this.bsModalRef.hide()
  }

  onCancel(){
    this.bsModalRef.hide()
  }

  refresh(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home']);
  }

}
