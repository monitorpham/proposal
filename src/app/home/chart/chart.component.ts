import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ProposalService } from '../../_services/proposal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Chart, ChartType, ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import pluginDataLabels from 'chartjs-plugin-datalabels';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SCommonService } from 'src/app/_services/s-common.service';

@Component({
  selector: 'app-home',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  isStatus: Boolean = true;
  public userData = [];
  public userStatus = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public chartData: ChartDataset[] = [
    { data: [], label: 'Đã hoàn thành', backgroundColor: 'rgba(61, 255, 36, 0.84)', borderColor: 'rgba(14, 117, 0, 1)', hoverBackgroundColor: '#2af517', hoverBorderColor: 'rgba(20,200,10,0.4)' },
    { data: [], label: 'Chưa hoàn thành' }
  ];
  public labels: string[] = [];
  public options: ChartOptions = {
    responsive: true,
  }
  public barChartPlugins = [pluginDataLabels];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  constructor(
    private proposalService: ProposalService,
    private fb: FormBuilder,
    private commonService: SCommonService,
  ) {
  }

  ngOnInit() {
    // this.proposalService.getAllProposalsStatus(this.isStatus).subscribe((dataTrue: any) => {
    //   this.userStatus = [];
    //   for (const row of dataTrue) {
    //     const dataT = {
    //       iduser: row.proposal.userExtra.id,
    //       user: row.proposal.userExtra.user.firstName,
    //       status: row.proposal.status
    //     }
    //     this.userStatus.push(dataT)
    //   }
    //   //console.log(this.userStatus)

    //   var reduced = this.userStatus.reduce((acc, o) => (acc[o.user] = (acc[o.user] || 0) + 1, acc), {});
    //   //console.log(reduced)

    //   //Method 1
    //   let result1 = [];
    //   for (var prop in reduced) {
    //     result1.push({ user: prop, countStatus: reduced[prop] });
    //   }
    //  // console.log(result1)

    //   //Method 2
    //   // var result2 = Object.keys(reduced).map(x =>  {
    //   //         return {user : x, countStatus : reduced[x]}})           
    //   // console.log(result2)

    //   for (const row of result1) {
    //     this.labels.push(row['user'])
    //     this.chartData[0].data.push(row['countStatus'])
    //     this.chart.update();
    //   }
    // })


    // this.proposalService.getAllProposalsStatus(false).subscribe((dataTrue: any) => {
    //   this.userStatus = [];
    //   for (const row of dataTrue) {
    //     const dataT = {
    //       iduser: row.proposal.userExtra.id,
    //       user: row.proposal.userExtra.user.firstName,
    //       status: row.proposal.status
    //     }
    //     this.userStatus.push(dataT)
    //   }
    //   //console.log(this.userStatus)

    //   var reduced = this.userStatus.reduce((acc, o) => (acc[o.user] = (acc[o.user] || 0) + 1, acc), {});
    //   //console.log(reduced)

    //   //Method 1
    //   let result1 = [];
    //   for (var prop in reduced) {
    //     result1.push({ user: prop, countStatus: reduced[prop] });
    //   }
    //   //console.log(result1)

    //   for (const row of result1) {
    //     this.chartData[1].data.push(row['countStatus'])
    //     this.chart.update();
    //   }
    // })


  }

  dateForm = this.fb.group({
    dateOne: [''],
    dateTwo: [''],
  });



  onSave() {
    // if (this.chartData[1].data = null) {
    // console.log("ok")
    const dateOne = this.dateForm.get(['dateOne']).value;
    let date1 = this.commonService.DDMMYYYYtoIsoString(dateOne)

    const dateTwo = this.dateForm.get(['dateTwo']).value;
    // let momentVariable2 = moment(dateTwo, 'MM-DD-YYYY');  
    // let dateOne2 = momentVariable2.format('DD-MM-YYYY');   
    let date2 = this.commonService.DDMMYYYYtoIsoString(dateTwo)
    // console.log(date2)

    this.proposalService.getAllProposalsStatusBetweenDate(this.isStatus, date1, date2).subscribe((dataTrue: any) => {
      // console.log(dataTrue)
      this.userStatus = [];
      if (this.userStatus = null) {
        for (const row of dataTrue) {
          const dataT = {
            iduser: row.userExtra.id,
            user: row.userExtra.user.firstName,
            status: row.status
          }
          this.userStatus.push(dataT)
        }
      }
      else {
        this.userStatus = [];
        // console.log(this.userStatus)
        for (const row of dataTrue) {
          const dataT = {
            iduser: row.userExtra.id,
            user: row.userExtra.user.firstName,
            status: row.status
          }
          this.userStatus.push(dataT)
        }
      }
      // console.log(this.userStatus)

      var reduced = this.userStatus.reduce((acc, o) => (acc[o.user] = (acc[o.user] || 0) + 1, acc), {});
      //console.log(reduced)

      //Method 1
      let result1 = [];
      for (var prop in reduced) {
        result1.push({ user: prop, countStatus: reduced[prop] });
      }

      //Method 2
      // var result2 = Object.keys(reduced).map(x =>  {
      //         return {user : x, countStatus : reduced[x]}})           
      // console.log(result2)
      if (this.labels = null) {
        for (const row of result1) {
          this.labels.push(row['user'])
          this.chartData[0].data.push(row['countStatus'])
          this.chart.update();
        }
      }
      else {
        this.labels = []
        this.chartData[0].data = []
        for (const row of result1) {
          this.labels.push(row['user'])
          this.chartData[0].data.push(row['countStatus'])
          this.chart.update();
        }
      }
    })


    this.proposalService.getAllProposalsStatusBetweenDate(false, date1, date2).subscribe((dataTrue: any) => {
      this.userStatus = [];
      if (this.userStatus = null) {
        for (const row of dataTrue) {
          const dataT = {
            iduser: row.userExtra.id,
            user: row.userExtra.user.firstName,
            status: row.status
          }
          this.userStatus.push(dataT)
        }
      }
      else {
        this.userStatus = [];
        for (const row of dataTrue) {
          const dataT = {
            iduser: row.userExtra.id,
            user: row.userExtra.user.firstName,
            status: row.status
          }
          this.userStatus.push(dataT)
        }
      }
      var reduced = this.userStatus.reduce((acc, o) => (acc[o.user] = (acc[o.user] || 0) + 1, acc), {});

      //Method 1
      let result1 = [];
      for (var prop in reduced) {
        result1.push({ user: prop, countStatus: reduced[prop] });
      }

      if (this.labels = null) {
        for (const row of result1) {
          this.labels.push(row['user'])
          this.chartData[0].data.push(row['countStatus'])
          this.chart.update();
        }
      }
      else {
        this.labels = []
        this.chartData[1].data = []
        for (const row of result1) {
          this.labels.push(row['user'])
          this.chartData[1].data.push(row['countStatus'])
          this.chart.update();
        }
      }
    })
    // }
    // else {
    //   console.log("oks")
    //   // setTimeout(() => {
    //   //   window.location.reload();
    //   // }, 100);
    // }
  }

}

