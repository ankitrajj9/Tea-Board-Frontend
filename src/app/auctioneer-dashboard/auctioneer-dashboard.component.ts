import { Component } from '@angular/core';
import { AuctionServiceService } from '../auction-service.service';
import { Router } from '@angular/router';
import { AuctionDetail } from '../auction-detail';
import * as $ from "jquery";

@Component({
  selector: 'app-auctioneer-dashboard',
  templateUrl: './auctioneer-dashboard.component.html',
  styleUrls: ['./auctioneer-dashboard.component.css']
})
export class AuctioneerDashboardComponent {
  noAuctions:boolean
  auctions:AuctionDetail[];

  constructor(private auctionService: AuctionServiceService,private router: Router) { }

  ngOnInit(): void {
    this.noAuctions=false
    this.auctionService.findLiveAuctions().subscribe(data => {
      this.auctions = data;
      if(data == undefined || data.length == 0){
        this.noAuctions=true
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

  // public getLiveAuctions(){
  //   this.auctionService.findLiveAuctions().subscribe(data => {
  //     this.auctions = data;
  //     if(data == undefined || data.length == 0){
  //       this.noAuctions=true
  //     }
  //   });
  //   $('#mat-button-toggle-1').addClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
  //     $('#mat-button-toggle-5').addClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
  // }

  // public getPendingAuctions(){
  //   $('#mat-button-toggle-1').removeClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
  //   $('#mat-button-toggle-5').removeClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
  //   $('#mat-button-toggle-1').addClass("mat-button-toggle mat-button-toggle-appearance-standard")
  //     $('#mat-button-toggle-5').addClass("mat-button-toggle mat-button-toggle-appearance-standard")
  //   this.auctionService.findPendingAuctions().subscribe(data => {
  //     this.auctions = data;
  //     if(data == undefined || data.length == 0){
  //       this.noAuctions=true
  //     }
  //   });
  // }

  // public getAllAuctions(){
  //   $('#mat-button-toggle-1').removeClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
  //   $('#mat-button-toggle-5').removeClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
  //   $('#mat-button-toggle-1').addClass("mat-button-toggle mat-button-toggle-appearance-standard")
  //   $('#mat-button-toggle-5').addClass("mat-button-toggle mat-button-toggle-appearance-standard")
  //   this.auctionService.findAuctions().subscribe(data => {
  //     this.auctions = data;
  //     if(data == undefined || data.length == 0){
  //       this.noAuctions=true
  //     }
  //   });
  // }
  public getLiveAuctions(){
    this.auctionService.findLiveAuctions().subscribe(data => {
      this.auctions = data;
      //this.tabId=1
      if(data == undefined || data.length == 0){
        this.noAuctions=true
      }
      else{
        this.noAuctions=false
      }
    });
    $('#mat-button-toggle-1').addClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
      $('#mat-button-toggle-5').addClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
  }

  public getPendingAuctions(){
    //this.tabId=2
    $('#mat-button-toggle-1').removeClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
    $('#mat-button-toggle-5').removeClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
    $('#mat-button-toggle-1').addClass("mat-button-toggle mat-button-toggle-appearance-standard")
      $('#mat-button-toggle-5').addClass("mat-button-toggle mat-button-toggle-appearance-standard")
    this.auctionService.findPendingAuctions().subscribe(data => {
      this.auctions = data;
      if(data == undefined || data.length == 0){
        this.noAuctions=true
      }
      else{
        this.noAuctions=false
      }
    });
  }

  public getAllAuctions(){
    //this.tabId=3
    $('#mat-button-toggle-1').removeClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
    $('#mat-button-toggle-5').removeClass("mat-button-toggle mat-button-toggle-appearance-standard mat-button-toggle-checked")
    $('#mat-button-toggle-1').addClass("mat-button-toggle mat-button-toggle-appearance-standard")
    $('#mat-button-toggle-5').addClass("mat-button-toggle mat-button-toggle-appearance-standard")
    this.auctionService.findAuctions().subscribe(data => {
      this.auctions = data;
      if(data == undefined || data.length == 0){
        this.noAuctions=true
      }
      else{
        this.noAuctions=false
      }
    });
  }
}
