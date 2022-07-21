import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Proposal } from '../../_models/proposal';
import { AccountService } from '../../_services/account.service';
import { ProposalService } from '../../_services/proposal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalCreateProposalComponent } from '../component/modal-create-proposal/modal-create-proposal.component';
import { ModalUpdateProgressComponent } from '../component/modal-update-progress/modal-update-progress.component';
import { Subject } from 'rxjs';
import { ModalDeleteProposalComponent } from '../component/modal-delete-proposal/modal-delete-proposal.component';
import { ModalViewProgressComponent } from '../component/modal-view-progress/modal-view-progress.component';
import { Router } from '@angular/router';
import { User } from '../../_models/user';
import { ModalExtendComponent } from '../component/modal-extend/modal-extend.component';
import { ProgressService } from '../../_services/progress.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: JQueryStatic;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  proposals: Proposal[] = [];
  currentUser: User;
  isUser: Boolean = false;
  isAdmin: Boolean = false;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger = new Subject();
  progresses: any
  scrollHeight: string;
  private toastr : ToastrService
  number: any = 15
  // onlyActive: boolean = false;

  constructor(
    private accountService: AccountService,
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private proposalService: ProposalService,
    private progressService: ProgressService,
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  numberForm = this.fb.group({
    number: ['',[Validators.required]],
  });

  ngOnInit() {
    this.progressService.getAllProgresses().subscribe(res => {
      this.progresses = res
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 500,
      columnDefs: [
        { width: "25%", targets: 7 },
        { width: "25%", targets: 8 },
      ],
      processing: true,
      // Configure the buttons
      dom: 'Bfrtip',
      buttons: [
        'copy', 'excel'
      ]
    };
    this.loadData();
    // document.getElementById("notee").style.height = document.getElementById("notee").scrollHeight.toString() + 'px'
  }


  loadData() {
    // const number = this.numberForm.get(['number']).value;
    this.accountService.fetch().subscribe(res => {
      this.currentUser = res
      // console.log(this.currentUser)
      if (this.currentUser.authorities.includes("ROLE_USER")) {
        this.isUser = true
      }
      if (this.currentUser.authorities.includes("ROLE_ADMIN")) {
        this.isAdmin = true
      }
      // console.log(this.isAdmin)
    })
    this.proposalService.getAllProposalsAlert(this.number).subscribe(res => {
      this.proposals = res.map(item => {
        //console.log(res)
        // debugger;
        let proposal = new Proposal()
        proposal.id = item.proposal.id
        proposal.note = item.proposal.note
        proposal.contentProposal = item.proposal.contentProposal
        proposal.startDate = proposal.convertDate(item.proposal.startDate)
        proposal.endDate = proposal.convertDate(item.proposal.endDate)
        proposal.currentProgressName = item.currentProgressName
        proposal.hospitalDepartmentId = item.proposal.hospitalDepartment.id
        proposal.hospitalDepartment = item.proposal.hospitalDepartment.hospitalDepartmentName
        proposal.Group = item.proposal.userExtra.equiqmentGroup.nameGroup
        proposal.remainingDate = item.remainingDate
        proposal.additionalDate = item.proposal.additionalDate
        proposal.deadLine = proposal.convertDate(item.deadLine)
        proposal.status = item.proposal.status
        proposal.asignee = item.proposal.userExtra.user.firstName
        proposal.asigneeId = item.proposal.userExtra.user.id

        if (proposal.status == true) {
          proposal.status = "Hoàn thành"
        }
        else if (proposal.status == false) (
          proposal.status = "Đang xử lý"
        )



        return proposal
      }, err => {
        console.log(err)
      })
      this.dtTrigger.next();
    })
  }

  // reloadData(){
  //   this.proposalService.getAllProposals().subscribe(res => {
  //     this.proposals = res.map(item => {
  //       let proposal = new Proposal()
  //       proposal.id = item.proposal.id
  //       proposal.note = item.proposal.note
  //       proposal.contentProposal = item.proposal.contentProposal
  //       proposal.startDate = proposal.convertDate(item.proposal.startDate)
  //       proposal.endDate = proposal.convertDate(item.proposal.startDate)
  //       proposal.currentProgressName = item.currentProgressName
  //       proposal.hospitalDepartment = item.proposal.hospitalDepartment.hospitalDepartmentName
  //       proposal.registerBy = item.proposal.userExtra.user.firstName
  //       proposal.Group = item.proposal.userExtra.equiqmentGroup.nameGroup
  //       return proposal
  //     }, err => {
  //       console.log(err)
  //     })
  //   })
  // }

  // toggleView(value) {
  //   // this.onlyActive = value.currentTarget.checked;
  //   this.proposals = JSON.parse(JSON.stringify(this.proposals.filter(f => f.status == value.currentTarget.checked)));
  //   console.log()
  // }

  OpenCreateProposalModal() {
    this.bsModalRef = this.modalService.show(ModalCreateProposalComponent, { class: "modal-lg" });
    // this.modalService.onHide.subscribe((reason: string) => {
    //   this.refresh()
    // })
  }

  OpenUpdateProgressModal(proposal) {
    const initialState = {
      proposal: proposal,
    };
    this.bsModalRef = this.modalService.show(ModalUpdateProgressComponent, { initialState, class: "modal-lg" });
    // this.modalService.onHide.subscribe((reason: string) => {
    //   this.refresh()
    // })
  }

  openDeleteProposalModal(proposal) {
    const initialState = {
      proposal: proposal,
    };
    this.bsModalRef = this.modalService.show(ModalDeleteProposalComponent, { initialState })
    // this.modalService.onHide.subscribe((reason: string) => {
    //   this.refresh()
    // })
  }


  OpenViewProgressModal(proposal) {
    const initialState = {
      proposal: proposal,
    };
    this.bsModalRef = this.modalService.show(ModalViewProgressComponent, { initialState, class: "modal-lg" });
  }

  openExtendProposalModal(proposal) {
    const initialState = {
      proposal: proposal,
    };
    this.bsModalRef = this.modalService.show(ModalExtendComponent, { initialState, class: "modal-lg" });
  }

  refresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home']);
  }

  getProgressBarWidth(stage) {
    let result = 0
    for (let i = 1; i < this.progresses.length; i++) {
      if (this.progresses[i].contentTask == stage) {
        result = (i + 1) * 100 / this.progresses.length
      }
    }
    // debugger;
    return Math.floor(result)
  }

  // getHeight(){
  //   return  document.getElementById("notee").scrollHeight.toString() + 'px'
  // }
  // isDisable = false;
  onSave() {
    this.number = this.numberForm.get(['number']).value;
    if(this.number=='' || this.number==null){
        return;
    }
    const table = $("#example").DataTable();
    // table.clear().draw();
    table.destroy();
    // console.log(this.number)

    this.loadData();
  }
  //   clearData() {

  //     const table = $("#example").DataTable();
  //     console.log(table)
  //     table.clear().draw();

  // }
}
