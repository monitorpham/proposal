import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { ModalDeleteProposalComponent } from '../modal-delete-proposal/modal-delete-proposal.component';
import { ModalCompleteProgressComponent } from '../modal-complete-progress/modal-complete-progress.component';
import { ProposalService } from 'src/app/_services/proposal.service';
import { Progress } from 'src/app/_models/progress';
import { Proposal } from 'src/app/_models/proposal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-update-progress',
  templateUrl: './modal-update-progress.component.html',
  styleUrls: ['./modal-update-progress.component.css']
})
export class ModalUpdateProgressComponent implements OnInit {
  proposal: Proposal

  alternate: boolean = true;
  toggle: boolean = true;
  color: boolean = true;
  size: number = 20;
  expandEnabled: boolean = true;
  contentAnimation: boolean = true;
  dotAnimation: boolean = true;
  side = 'left';
  entries : Progress[] = []
  constructor(
    private bsModalRef: BsModalRef,
    private bsModalRef2: BsModalRef,
    private modalService: BsModalService,
    private router: Router,
    private proposalService: ProposalService
    ){ }

  ngOnInit(): void {
    // console.log("id:" + this.proposal.id)
    this.proposalService.getProgressesByProposalId(this.proposal.id).subscribe(res => {
      // console.log("res:" + res)
      // debugger;
      this.entries = res.map(item =>{
        // console.log("item: " + item)
        // debugger;
        let progress = new Progress(item.id, item.progress.contentTask, item.timeStart ,item.timeEnd, item.performBy, item.note)
        return progress
      })
      console.log("entries: ")
    console.log(this.entries)
    })
  }

  onExpandEntry(expanded, index) {
    console.log(`Expand status of entry #${index} changed to ${expanded}`)
  }

  onHeaderClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onDotClick(event) {
    // if (!this.expandEnabled) {
    //   event.stopPropagation();
    // }
  }

  toggleSide() {
    this.side = this.side === 'left' ? 'right' : 'left';
  }

  onSave(){
    this.bsModalRef.hide()
  }

  onCancel(){
    this.bsModalRef.hide()
  }

  openCompleteProgressModal(progress){
    const initialState = {
      progress: progress,
      
    };
    this.bsModalRef2 = this.modalService.show(ModalCompleteProgressComponent, {initialState})
    this.bsModalRef2.content.progress = progress
  }

  // isCurrentProgress(i){
  //   if(i==0 && this.entries[i].time == null){
  //     return true;
  //   }
  //   if(i>0){
  //     if(this.entries[i].time == null && this.entries[i-1].time !=null){
  //       return true;
  //     }
  //   }
  //   return false
  // }

}