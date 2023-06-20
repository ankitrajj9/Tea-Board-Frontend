import { Component } from '@angular/core';
import { AuctionServiceService } from '../auction-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportDetail } from '../report-detail';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.css']
})
export class ReportDashboardComponent {
  auctionDetailId:any
  reportData:ReportDetail[]
  closeResult: string = '';

  exitDtls:any[]

  constructor(private auctionService: AuctionServiceService,private router: Router,private route:ActivatedRoute,private modalService: NgbModal) { 
    this.auctionDetailId = this.route.snapshot.params['auctionDetailId'];
  }

  ngOnInit(): void {
    this.auctionDetailId=this.route.snapshot.params['auctionDetailId'];
    console.log(this.auctionDetailId)
    this.auctionService.getReportDetails(this.auctionDetailId).subscribe(data => {
      console.log(data)
      this.reportData = data;
      
    });

    
  }

  open(content:any,itemDetailId:any) {
    this.exitDtls = new Array
    console.log('Item Id :' +itemDetailId)
    for (var exitDtl of this.reportData) {
      if(exitDtl.auctionItemDetailId == itemDetailId){
        for(var ed of exitDtl.exitDetails){
      this.exitDtls.push(ed)
    }
    }
    }
    console.log('FINAL DETAILS')
    console.log(this.exitDtls)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
