import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { ProposalService } from 'src/app/_services/proposal.service';
import { Progress } from 'src/app/_models/progress';
import { Proposal } from 'src/app/_models/proposal';

@Component({
  selector: 'app-modal-view-progress',
  templateUrl: './modal-view-progress.component.html',
  styleUrls: ['./modal-view-progress.component.scss']
})
export class ModalViewProgressComponent implements OnInit {

  proposal: Proposal

  alternate: boolean = true;
  toggle: boolean = true;
  color: boolean = true;
  size: number = 0;
  expandEnabled: boolean = false;
  contentAnimation: boolean = true;
  dotAnimation: boolean = true;
  side = 'left';
  entries : Progress[] = []
  constructor(
    private bsModalRef: BsModalRef,
    private bsModalRef2: BsModalRef,
    private modalService: BsModalService,
    private proposalService: ProposalService
    ){ }

  ngOnInit(): void {
    this.proposalService.getProgressesByProposalId(this.proposal.id).subscribe(res => {
      this.entries = res.map(item =>{
        let progress = new Progress(item.id, item.progress.contentTask, item.timeStart ,item.timeEnd, item.performBy, item.note)
        return progress
      })
      for(let i=0; i < this.entries.length; i++){
        if(!this.entries[i]['timeEnd']){
          this.entries.slice(i,1)
        }
      }
      console.log("entries: ")
    console.log(this.entries)
    }, err => err)
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
