import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProposalService } from 'src/app/_services/proposal.service';
import { ProgressService } from 'src/app/_services/progress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-complete-progress',
  templateUrl: './modal-complete-progress.component.html',
  styleUrls: ['./modal-complete-progress.component.scss']
})
export class ModalCompleteProgressComponent implements OnInit {

  progress: any

  constructor(
    private bsModalRef2: BsModalRef,
    private propsalService: ProposalService,
    private router: Router,
    private progressService: ProgressService
  ) { }

  ngOnInit(): void {
    console.log(this.progress)
  }

  onFinish(){
    this.progressService.completeProgress(this.progress).subscribe(res =>{
      console.log(res)
      this.refresh();
    }, err =>{
      console.log(err)
    })
    this.bsModalRef2.hide()
    
  }

  refresh(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home']);
  }

  onCancel(){
    this.bsModalRef2.hide()
  }

  

}
