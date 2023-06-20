import { Component } from '@angular/core';
import { AuctionDetail } from '../auction-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionServiceService } from '../auction-service.service';

@Component({
  selector: 'app-approve-auction',
  templateUrl: './approve-auction.component.html',
  styleUrls: ['./approve-auction.component.css']
})
export class ApproveAuctionComponent {
  auctionDetail : AuctionDetail
  auctionDetailId:any
  userLoginId:any
  
  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private auctionService: AuctionServiceService) {
          console.log('user form component load');
    this.auctionDetail = new AuctionDetail();
  }

  ngOnInit():void{
    this.auctionDetailId=this.route.snapshot.params['auctionDetailId'];
    this.userLoginId=window.localStorage.getItem('userLoginId')
    this.auctionService.getAuctionByAuctionDetailId(this.auctionDetailId).subscribe(data => {
      console.log(data)
      this.auctionDetail = data;
    });
  }

  approveAuction() {
    let parsedStartDate=this.parseDate(this.auctionDetail.startDate)
    let parsedEndDate=this.parseDate(this.auctionDetail.endDate)
    this.auctionDetail.startDate = parsedStartDate
    this.auctionDetail.endDate = parsedEndDate
    this.auctionService.approveAuction(this.auctionDetail).subscribe(result => {
      if(result.responseCode == 200){
        this.router.navigate(['auctioneerdashboard']);
      }
      console.log(result)
    });
  }

  public parseDate(date:String):string{
    let parsedDate = '';
    let currdate = date.split('T')[0]
    let currTime = date.split('T')[1]
    parsedDate = currdate+' '+currTime+':00'
    return parsedDate
  }
}
