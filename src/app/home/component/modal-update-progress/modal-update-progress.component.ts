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
  tempEntries: Progress[] = [];
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
      this.tempEntries = res.map(item => {
        let output = item
        output.timeEnd = this.commonService.toDDMMYYYY(output.timeEnd)
        return output
      })
      for (let i = 1; i < this.tempEntries.length; i++) {
        this.entries.push(this.tempEntries[i])
      }
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


  onCancel() {
    this.bsModalRef.hide()
  }


  saveProgress(index) {
    let formData: any[] = []
    formData.push(this.tempEntries[0])
    for (let temp = 0; temp < this.entries.length; temp++) {
      formData.push(this.entries[temp])
    }

    // console.log(formData)
    // debugger;

    for (let i = 0; i < formData.length; i++) {
      formData[i].timeEnd = this.commonService.DDMMYYYYtoIsoString(formData[i].timeEnd)
    }
    // console.log(formData)

    if (!this.validateForm(formData, index)) {
      this.toastr.warning("Invalid date input. Make sure the approval date of a stage is not sooner than the previous stage.")
      // this.initData()
      window.location.reload() 
    } else {
      this.progressService.updateProgress(formData, this.proposal.id).subscribe(res => {
        this.toastr.success("Update progress successfully!")
        this.refresh();
        this.bsModalRef.hide()
      }, err => {
        this.toastr.error("Update progress failed!")
      })
    }
  }

  validateForm(formData, index) {
    let result = true;
    for (let i = 1; i < formData.length; i++) {
      for (let j = 0; j < i; j++) {
        if (formData[i].timeEnd && formData[j].timeEnd) {
          if (this.commonService.dateStringToTime(formData[i].timeEnd) < this.commonService.dateStringToTime(formData[j].timeEnd)) {
            result = false;
            break;
          }
        }
      }
    }
    return result;
  }
  refresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home']);
  }


}