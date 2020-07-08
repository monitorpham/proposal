import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { ModalDeleteProposalComponent } from '../modal-delete-proposal/modal-delete-proposal.component';
import { ModalCompleteProgressComponent } from '../modal-complete-progress/modal-complete-progress.component';
import { ProposalService } from 'src/app/_services/proposal.service';
import { Progress } from 'src/app/_models/progress';
import { Proposal } from 'src/app/_models/proposal';
import { Router } from '@angular/router';
import { SCommonService } from 'src/app/_services/s-common.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ProgressService } from 'src/app/_services/progress.service';

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
  entries: Progress[] = []
  constructor(
    private bsModalRef: BsModalRef,
    private bsModalRef2: BsModalRef,
    private modalService: BsModalService,
    private router: Router,
    private proposalService: ProposalService,
    private commonService: SCommonService,
    private toastr: ToastrService,
    private progressService: ProgressService

  ) { }

  ngOnInit(): void {
    this.initData()
  }

  initData() {
    this.proposalService.getProgressesByProposalId(this.proposal.id).subscribe(res => {
      this.entries = res.map(item => {
        let output = item
        output.timeEnd = this.commonService.toDDMMYYYY(output.timeEnd)
        return output
      })
      console.log("entries: ")
      console.log(this.entries)
      // debugger;
    })
  }

  onExpandEntry(expanded, index) {
    if (index != '0') {
      console.log(`Expand status of entry #${index} changed to ${expanded}`)
    }
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

  // onSave(){

  //   this.bsModalRef.hide()
  // }

  onCancel() {
    this.bsModalRef.hide()
  }

  // openCompleteProgressModal(progress){
  // const initialState = {
  //   progress: progress,

  // };
  // this.bsModalRef2 = this.modalService.show(ModalCompleteProgressComponent, {initialState})
  // this.bsModalRef2.content.progress = progress
  // }

  saveProgress(index) {
    // debugger;
    let formData: any = this.entries
    console.log(this.entries)
    console.log(formData)

    for (let i = 0; i < formData.length; i++) {
      // debugger;
      formData[i].timeEnd = this.commonService.DDMMYYYYtoIsoString(formData[i].timeEnd)
    }
    console.log(formData)

    // debugger;
    if (!this.validateForm(formData, index)) {
      debugger;
      this.toastr.warning("Invalid date input. Please check again?")
    } else {
      this.progressService.updateProgress(formData, this.proposal.id).subscribe(res => {
        this.toastr.success("Update progress successfully!")
        this.bsModalRef.hide()
      }, err => {
        this.toastr.error("Update progress failed!")
      })

      // }

    }
  }

  validateForm(formData, index) {
    let result = true;
    for (let i = 0; i < index; i++) {
      if(formData[i].endDate){
        if (this.commonService.dateStringToTime(formData[i].endDate) > this.commonService.dateStringToTime(formData[index].endDate)) {
          result = false;
        }
      }
    }
    return result;
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