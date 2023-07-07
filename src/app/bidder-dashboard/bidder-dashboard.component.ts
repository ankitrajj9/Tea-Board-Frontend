import { Component } from '@angular/core';
import { AuctionDetail } from '../auction-detail';
import { Router } from '@angular/router';
import { AuctionServiceService } from '../auction-service.service';

@Component({
  selector: 'app-bidder-dashboard',
  templateUrl: './bidder-dashboard.component.html',
  styleUrls: ['./bidder-dashboard.component.css']
})
export class BidderDashboardComponent {
  noAuctions:boolean
  auctions:AuctionDetail[];
  tabId:number
  totalAuctions:number = 0
  liveFlag:boolean = true
  pendingFlag:boolean = false
  allFlag:boolean = false
  constructor(private auctionService: AuctionServiceService,private router: Router) { }

  ngOnInit(): void {
    this.noAuctions=false
    this.auctionService.findLiveAuctions().subscribe(data => {
      this.auctions = data;
      this.tabId=1
      if(data == undefined || data.length == 0){
        this.noAuctions=true
        this.totalAuctions=this.auctions.length
        this.liveFlag=true
        this.allFlag=false
        this.pendingFlag=false
        this.noAuctions=true
      }
      else{
        this.totalAuctions=this.auctions.length
        this.liveFlag=true
        this.allFlag=false
        this.pendingFlag=false
        this.noAuctions=false
      }
    });
  }

  ngAfterContentInit() {
    $(document).ready(function(){
      $('#mat-button-toggle-1').addClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
      $('#mat-button-toggle-5').addClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
    });
}
  
  public searchAuction(event:any){
    console.log('search auctions called!')
  }

  public getLiveAuctions(){
    this.auctionService.findLiveAuctions().subscribe(data => {
      this.auctions = data;
      this.tabId=1
      if(data == undefined || data.length == 0){
        this.noAuctions=true
        this.totalAuctions=this.auctions.length
        this.liveFlag=true
        this.allFlag=false
        this.pendingFlag=false
        this.noAuctions=true
      }
      else{
        this.totalAuctions=this.auctions.length
        this.liveFlag=true
        this.allFlag=false
        this.pendingFlag=false
        this.noAuctions=false
      }
    });
    $('#mat-button-toggle-1').addClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
      $('#mat-button-toggle-5').addClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
  }

  public getPendingAuctions(){
    this.tabId=2
    $('#mat-button-toggle-1').removeClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
    $('#mat-button-toggle-5').removeClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
    $('#mat-button-toggle-1').addClass("mat-button-toggle mat-button-toggle-appearance-standard")
      $('#mat-button-toggle-5').addClass("mat-button-toggle mat-button-toggle-appearance-standard")
    this.auctionService.findPendingAuctions().subscribe(data => {
      this.auctions = data;
      if(data == undefined || data.length == 0){
        this.noAuctions=true
        this.totalAuctions=this.auctions.length
        this.liveFlag=false
        this.allFlag=false
        this.pendingFlag=true
        this.noAuctions=true
      }
      else{
        this.totalAuctions=this.auctions.length
        this.liveFlag=false
        this.allFlag=false
        this.pendingFlag=true
        this.noAuctions=false
      }
    });
  }

  public getAllAuctions(){
    this.tabId=3
    $('#mat-button-toggle-1').removeClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
    $('#mat-button-toggle-5').removeClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
    $('#mat-button-toggle-1').addClass("mat-button-toggle mat-button-toggle-appearance-standard")
    $('#mat-button-toggle-5').addClass("mat-button-toggle mat-button-toggle-appearance-standard")
    this.auctionService.findAuctions().subscribe(data => {
      this.auctions = data;
      if(data == undefined || data.length == 0){
        this.noAuctions=true
        this.totalAuctions=this.auctions.length
        this.liveFlag=false
        this.allFlag=true
        this.pendingFlag=false
        this.noAuctions=true
      }
      else{
        this.totalAuctions=this.auctions.length
        this.liveFlag=false
        this.allFlag=true
        this.pendingFlag=false
        this.noAuctions=false
      }
    });
  }

  biddingDashboard(auctionDetailId:any){
    this.router.navigate([`biddingdashboard/${auctionDetailId}`]);
  }

  biddingDashboardNew(auctionDetailId:any){
    this.router.navigate([`biddingdashboardnew/${auctionDetailId}`]);
  }
}
