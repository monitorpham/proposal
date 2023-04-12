import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Proposal } from '../../../_models/proposal';
import { AccountService } from '../../../_services/account.service';
import { ProposalService } from '../../../_services/proposal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalCreateProposalComponent } from '../../component/modal-create-proposal/modal-create-proposal.component';
import { ModalUpdateProgressComponent } from '../../component/modal-update-progress/modal-update-progress.component';
import { Subject } from 'rxjs';
import { ModalDeleteProposalComponent } from '../../component/modal-delete-proposal/modal-delete-proposal.component';
import { ModalViewProgressComponent } from '../../component/modal-view-progress/modal-view-progress.component';
import { Router } from '@angular/router';
import { User } from '../../../_models/user';
import { ModalExtendComponent } from '../../component/modal-extend/modal-extend.component';
import { ProgressService } from '../../../_services/progress.service';
import { FormBuilder } from '@angular/forms';
declare var $: JQueryStatic;

@Component({
  selector: 'app-muonmay',
  templateUrl: './muonmay.component.html',
  styleUrls: ['./muonmay.component.scss'],
})
export class MuonmayComponent implements OnInit {
  proposals: Proposal[] = [];
  currentUser: User;
  isUser: Boolean = false;
  isAdmin: Boolean = false;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger = new Subject();
  progresses: any;
  scrollHeight: string;
  // onlyActive: boolean = false;

  currentTutorial = null;
  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 50;
  pageSizes = [50, 100, 200];
  pageNum: any;

  title = '';
  key: string = 'id';
  search: string = 'mượn máy';
  direction: string = 'ASC';

  searchForm = this.fb.group({
    search: [''],
  });

  constructor(
    private accountService: AccountService,
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private proposalService: ProposalService,
    private progressService: ProgressService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.progressService.getAllProgresses().subscribe((res) => {
      this.progresses = res;
    });

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 500,
    //   columnDefs: [
    //     { width: "25%", targets: 7 },
    //     { width: "25%", targets: 8 },
    //   ],
    //   processing: true,
    //   // Configure the buttons
    //   dom: 'Bfrtip',
    //   buttons: [
    //     'copy', 'excel'
    // ]
    // };
    this.loadData();
    // document.getElementById("notee").style.height = document.getElementById("notee").scrollHeight.toString() + 'px'
  }

  loadData() {
    this.accountService.fetch().subscribe((res) => {
      this.currentUser = res;
      // console.log(this.currentUser)
      if (this.currentUser.authorities.includes('ROLE_USER')) {
        this.isUser = true;
      }
      if (this.currentUser.authorities.includes('ROLE_ADMIN')) {
        this.isAdmin = true;
      }
      // console.log(this.isAdmin)
    });
    this.proposalService
      .getProposals(
        this.page - 1,
        this.pageSize,
        this.key,
        this.direction,
        this.search
      )
      .subscribe((res) => {
        this.proposals = res.content.map(
          (item) => {
            //  console.log(res)
            // debugger;
            let proposal = new Proposal();
            proposal.id = item.id;
            proposal.note = item.note;
            proposal.contentProposal = item.contentProposal;
            proposal.startDate = proposal.convertDate(item.startDate);
            proposal.endDate = proposal.convertDate(item.endDate);
            proposal.currentProgressName = item.currentProgressName;
            proposal.hospitalDepartmentId = item.hospitalDepartment.id;
            proposal.hospitalDepartment =
              item.hospitalDepartment.hospitalDepartmentName;
            proposal.Group = item.userExtra.equiqmentGroup.nameGroup;
            proposal.remainingDate = item.remainingDate;
            proposal.additionalDate = item.additionalDate;
            proposal.deadLine = proposal.convertDate(item.deadLine);
            proposal.status = item.status;
            proposal.asignee = item.userExtra.user.firstName;
            proposal.asigneeId = item.userExtra.user.id;

            if (proposal.status == true) {
              proposal.status = 'Hoàn thành';
            } else if (proposal.status == false) proposal.status = 'Đang xử lý';

            return proposal;
          },
          (err) => {
            console.log(err);
          }
        );
        // this.dtTrigger.next();

        this.count = res.totalElements;
        // console.log(this.count)
        // this.totalNoOfPages();
      });
  }
  handlePageChange(event) {
    this.page = event;
    this.loadData();
  }
  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.loadData();
  }
  setActiveTutorial(tutorial, index) {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
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
    this.bsModalRef = this.modalService.show(ModalCreateProposalComponent, {
      class: 'modal-lg',
    });
    // this.modalService.onHide.subscribe((reason: string) => {
    //   this.refresh()
    // })
  }

  exportExcel() {
    this.proposalService.getExcel().subscribe((response) => {
      let fileName = response.headers
        .get('content-disposition')
        ?.split(';')[1]
        .split('=')[1];
      // console.log(response)
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName + '.xlsx';
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }

  OpenUpdateProgressModal(proposal) {
    const initialState = {
      proposal: proposal,
    };
    this.bsModalRef = this.modalService.show(ModalUpdateProgressComponent, {
      initialState,
      class: 'modal-lg',
    });
    // this.modalService.onHide.subscribe((reason: string) => {
    //   this.refresh()
    // })
  }

  openDeleteProposalModal(proposal) {
    const initialState = {
      proposal: proposal,
    };
    this.bsModalRef = this.modalService.show(ModalDeleteProposalComponent, {
      initialState,
    });
    // this.modalService.onHide.subscribe((reason: string) => {
    //   this.refresh()
    // })
  }

  OpenViewProgressModal(proposal) {
    const initialState = {
      proposal: proposal,
    };
    this.bsModalRef = this.modalService.show(ModalViewProgressComponent, {
      initialState,
      class: 'modal-lg',
    });
  }

  openExtendProposalModal(proposal) {
    const initialState = {
      proposal: proposal,
    };
    this.bsModalRef = this.modalService.show(ModalExtendComponent, {
      initialState,
      class: 'modal-lg',
    });
  }

  refresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/all']);
  }

  getProgressBarWidth(stage) {
    let result = 0;
    for (let i = 1; i < this.progresses.length; i++) {
      if (this.progresses[i].contentTask == stage) {
        result = ((i + 1) * 100) / this.progresses.length;
      }
    }
    // debugger;
    return Math.floor(result);
  }

  // getHeight(){
  //   return  document.getElementById("notee").scrollHeight.toString() + 'px'
  // }

  // Search(){
  //   if(this.id==""){
  //     this.ngOnInit();
  //   }
  //   else{
  //     this.proposalService.getAllProposals(this.page-1, this.pageSize,'remainingDate').subscribe(res => {
  //       this.proposals = res.content.map(item => {
  //         return item.proposal.id.toLocaleLowerCase().match(this.id.toLocaleLowerCase());
  //       }
  //     )})
  //   }
  // }

  reverse: boolean = false;
  sort(key) {
    // console.log(this.key)
    this.key = key;
    if (this.direction == 'ASC') {
      this.direction = 'DESC';
    } else {
      this.direction = 'ASC';
    }
    // this.reverse = !this.reverse
    this.loadData();
  }

  onSearch() {
    // if (this.chartData[1].data = null) {
    // console.log("ok")
    const search = this.searchForm.get(['search']).value;
    this.search = search;
    this.loadData();
  }
}
