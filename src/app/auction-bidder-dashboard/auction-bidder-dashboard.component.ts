import { Component } from '@angular/core';
import { AuctionServiceService } from '../auction-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionDetail } from '../auction-detail';
import { AuctionItemDetail } from '../auction-item-detail';
import { PreBidDetail } from '../pre-bid-detail';

@Component({
  selector: 'app-auction-bidder-dashboard',
  templateUrl: './auction-bidder-dashboard.component.html',
  styleUrls: ['./auction-bidder-dashboard.component.css']
})
export class AuctionBidderDashboardComponent {
  auctionDetail:AuctionDetail
  userLoginId:any
  divHide:boolean=true
  auctionItems:AuctionItemDetail[]
  auctionDetailId:any
  preBidDetails:PreBidDetail[] 
  savedPreBidDetails:PreBidDetail[]
  bidsForUI:any

  constructor(private auctionService: AuctionServiceService,private router: Router,private route:ActivatedRoute) { 
    this.userLoginId = window.localStorage.getItem('userLoginId');
  }

  ngOnInit(): void {
    this.auctionDetailId=this.route.snapshot.params['auctionDetailId'];
    console.log(this.auctionDetailId)
    this.auctionService.getAuctionByAuctionDetailId(this.auctionDetailId).subscribe(data => {
      console.log(data)
      this.auctionDetail = data;
    });
    this.auctionService.getAuctionItems(this.auctionDetailId).subscribe(data => {
      console.log(data)
      this.auctionItems = data;
    });
    this.auctionService.getPreBidDetails(this.auctionDetailId,this.userLoginId).subscribe(data => {
      console.log(data)
      this.savedPreBidDetails = data;
      if(this.savedPreBidDetails != undefined){
        this.bidsForUI = new Map()
        for (var bidDtl of this.savedPreBidDetails) {
          this.bidsForUI.set(bidDtl.auctionItemDetailId,bidDtl.maxBid)
        }
        console.log('BIDS FOR UI : ')
        console.log(this.bidsForUI)
      }
    });

  }
  savePreBidDetails(){
    // for (let item in this.auctionItems) {
    //   console.log((<HTMLInputElement>document.getElementById("item_"+item.auctionItemDetailId)).value);
    // }
    this.preBidDetails = new Array()
    for (var item of this.auctionItems) {
      console.log(item.auctionItemDetailId)
      let preBidDtl:PreBidDetail = new PreBidDetail()
      let bidderId = window.localStorage.getItem('userLoginId')
      preBidDtl.maxBid=parseInt((<HTMLInputElement>document.getElementById("item_"+item.auctionItemDetailId)).value)
      preBidDtl.bidderId=bidderId
      preBidDtl.auctionItemDetailId=item.auctionItemDetailId
      console.log((<HTMLInputElement>document.getElementById("item_"+item.auctionItemDetailId)).value);
      this.preBidDetails.push(preBidDtl)
 }
    this.auctionService.addPreBidDetails(this.preBidDetails).subscribe(data => {
      if(data.responseCode == 200){
        this.divHide=false
          this.setTimer()
      }
      console.log(data)
      //this.auctionItems = data;
    });
  }
  public setTimer(){
    setTimeout(()=>{
            this.divHide=true
       }, 5000);
     
    }
}
