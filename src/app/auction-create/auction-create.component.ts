import { Component } from '@angular/core';
import { AuctionDetail } from '../auction-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionServiceService } from '../auction-service.service';

@Component({
  selector: 'app-auction-create',
  templateUrl: './auction-create.component.html',
  styleUrls: ['./auction-create.component.css']
})
export class AuctionCreateComponent {
  auctionDetail : AuctionDetail
  userLoginId:any;
  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private auctionService: AuctionServiceService) {
          console.log('user form component load');
    this.auctionDetail = new AuctionDetail();
  }

  ngOnInit():void{
    this.userLoginId = window.localStorage.getItem('userLoginId')
    this.auctionDetail.cstatus=0
  }

  saveAuction() {
    let parsedStartDate=this.parseDate(this.auctionDetail.startDate)
    let parsedEndDate=this.parseDate(this.auctionDetail.endDate)
    this.auctionDetail.startDate = parsedStartDate
    this.auctionDetail.endDate = parsedEndDate
    this.auctionDetail.createdBy=this.userLoginId
    this.auctionService.saveAuction(this.auctionDetail).subscribe(result => {
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
