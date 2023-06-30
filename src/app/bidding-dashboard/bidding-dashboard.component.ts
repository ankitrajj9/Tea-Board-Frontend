import { Component } from '@angular/core';
import { AuctionServiceService } from '../auction-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionDetail } from '../auction-detail';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AuctionItemDetail } from '../auction-item-detail';
import { LiveBidDetail } from '../live-bid-detail';
import * as $ from "jquery";


@Component({
  selector: 'app-bidding-dashboard',
  templateUrl: './bidding-dashboard.component.html',
  styleUrls: ['./bidding-dashboard.component.css']
})
export class BiddingDashboardComponent {
  userLoginId:any
  auctionDetail:AuctionDetail
  auctionDetailId:any
  auctionItems:AuctionItemDetail[]
  liveBidDetails:LiveBidDetail[]
  divHide:boolean=true
  dynMsg:string=''
  isButtonShow:boolean = true
  dynClass='alert alert-success'
  dynMessages = new Map()

  private socket_url='http://192.168.100.155:8080/socket'
  private stompClient:any;
  private staticUpdate:any;
  private dynUpdate:any;

  constructor(private auctionService: AuctionServiceService,private router: Router,private route:ActivatedRoute) { 
    this.userLoginId = window.localStorage.getItem('userLoginId');
    this.initializeWebSocketConnection()
    
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.socket_url);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, frame => {
      this.staticUpdate = that.stompClient.subscribe(`/broadcast/biddingdashboard/${this.auctionDetailId}`, (message) => {
        if(message.body) {
          console.log('static update called')
          for (var bidDtl of this.liveBidDetails) {
            let increment = bidDtl.increment;
            let currentPrice = bidDtl.currentBid;
            let maxBid = bidDtl.maxBid
            if((currentPrice+increment) <= maxBid && bidDtl.itemColor == 'alert-dark'){
            bidDtl.currentBid = currentPrice+increment
            bidDtl.auctionItemDetail.schedulerCount = bidDtl.auctionItemDetail.schedulerCount+1
          }
          else{
            this.isButtonShow=false
          }
          }
         }
      });
      this.dynUpdate = that.stompClient.subscribe(`/broadcast/biddingdashboarddyn/${this.auctionDetailId}`, (message) => {
        if(message.body) {
          console.log('dyn update called');
          this.auctionService.getLiveBidDetails(this.auctionDetailId,this.userLoginId).subscribe(data => {
            console.log(data)
            this.liveBidDetails = data;
            for(var bidDtl of this.liveBidDetails){
              this.setDynMessageAfterNewMessages(bidDtl.auctionItemDetail.auctionItemDetailId)
            }
          });
          
         }
      });
    });
  }

  sendMessage(auctionId:any){
    this.stompClient.send("/app/send/message" , {}, btoa(`${auctionId}`));
    //$('#input').val('');
  }

  ngOnInit(): void {
    this.auctionDetailId=this.route.snapshot.params['auctionDetailId'];
    this.auctionService.getAuctionByAuctionDetailId(this.auctionDetailId).subscribe(data => {
      console.log(data)
      this.auctionDetail = data;
    });
    this.auctionService.getLiveBidDetails(this.auctionDetailId,this.userLoginId).subscribe(data => {
      console.log(data)
      this.liveBidDetails = data;
    });
    console.log(this.auctionDetailId)
    // $('#item_'+799).show()
    //     $('#item_'+799).text('Max Bid Changed Successfully')
    //     $('#item_'+799).addClass('alert-success')
		// this.setTimerDynDiv('item_799')
  }

  ngOnDestroy(): void{
    if(this.staticUpdate != undefined){
    this.staticUpdate.unsubscribe();
    }
    if(this.dynUpdate != undefined){
    this.dynUpdate.unsubscribe();
  }
}

  ngAfterContentChecked(): void {
    $(document).ready(function(){
      //alert('test')
      $('.mat-mdc-form-field-subscript-wrapper').remove();
    });
  
}

  public saveLiveBidDetail(){
    console.log('Saved Live Bid Details')
  }

  public changeMaxBid(auctionItemDetailId:number){
    console.log((<HTMLInputElement>document.getElementById("item_"+auctionItemDetailId)).value);
    let maxBid = parseInt((<HTMLInputElement>document.getElementById("item_"+auctionItemDetailId)).value);
    if(maxBid != undefined && maxBid != 0 && !isNaN(maxBid)){
    this.auctionService.changeMaxBid(auctionItemDetailId,this.userLoginId,maxBid).subscribe(data => {
      console.log(data)
      if(data.responseCode == 200 && data.message=='Max Bid changed Successfully'){
        console.log('change bid success executed . . .')
        this.showDynMessage(auctionItemDetailId,'alert-success',data.message)
        //this.dynMessages.set(auctionItemDetailId,'alert-success'+'_'+data.message)
    }
    else if(data.responseCode == 200 && data.message=='Item is already alloted to you'){
      this.showDynMessage(auctionItemDetailId,'alert-danger',data.message)
    }
    else if(data.responseCode == 200 && data.message=='Item is already sold'){
      this.showDynMessage(auctionItemDetailId,'alert-danger',data.message)
    }
    else{
      this.showDynMessage(auctionItemDetailId,'alert-danger',data.message)
    }
    });
  }
  else{
    this.showDynMessage(auctionItemDetailId,'alert-danger','Invalid Bid')
  }
  }

  public exitFromItem(auctionItemDetailId:number){
    this.auctionService.exitFromItem(auctionItemDetailId,this.userLoginId).subscribe(data => {
      console.log(data)
      if(data.responseCode == 200 && data.message == 'Exited from item Successfully'){
        this.showDynMessage(auctionItemDetailId,'alert-success',data.message)
        this.auctionService.getLiveBidDetails(this.auctionDetailId,this.userLoginId).subscribe(data => {
          console.log(data)
          this.liveBidDetails = data;
        });
      }
    else if(data.responseCode == 200 && data.message=='Item is already alloted to you'){
      this.showDynMessage(auctionItemDetailId,'alert-danger',data.message)
    }
    else if(data.responseCode == 200 && data.message=='Item is already sold'){
      this.showDynMessage(auctionItemDetailId,'alert-danger',data.message)
    }
    else{
      this.showDynMessage(auctionItemDetailId,'alert-danger',data.message)
    }
    });
  }


  public setTimer(){
    setTimeout(()=>{
            this.divHide=true
       }, 5000);
     
    }

    public setTimerDynDiv(dynDiv:string){
      console.log('dyn div set called!')
      setTimeout(()=>{
        $('#'+dynDiv).hide();
        }, 5000);
      }

      // public dynMessage(auctionItemDetailId:number,cssClass:string,dynMsg:string){
      //   $('#item_'+auctionItemDetailId).removeClass('alert-success')
      //   $('#item_'+auctionItemDetailId).removeClass('alert-danger')
      //   $('#item_'+auctionItemDetailId).show()
      //   $('#item_'+auctionItemDetailId).text('Max Bid Changed Successfully')
      //   $('#item_'+auctionItemDetailId).addClass('alert-success')
      //   setTimeout(()=>{
      //     $('#item_'+auctionItemDetailId).hide();
      //     }, 5000);
      // }

      public showDynMessage(auctionItemDetailId:number,cssClass:string,dynMsg:string){
        //this.dynMessages.set(auctionItemDetailId,cssClass+'_'+dynMsg)
        $('#item_dynMsg_'+auctionItemDetailId).removeClass('alert-success')
        $('#item_dynMsg_'+auctionItemDetailId).removeClass('alert-danger')
        $('#item_dynMsg_'+auctionItemDetailId).show()
        $('#item_dynMsg_'+auctionItemDetailId).text(dynMsg)
        $('#item_dynMsg_'+auctionItemDetailId).addClass(cssClass)
        setTimeout(()=>{
          $('#item_dynMsg_'+auctionItemDetailId).hide();
          //this.dynMessages.delete(auctionItemDetailId)
          }, 5000);
      }

      public setDynMessageAfterNewMessages(auctionItemDetailId:number){
        if(this.dynMessages.get(auctionItemDetailId) != undefined){
          let cssClass = this.dynMessages.get(auctionItemDetailId).toString().split('_')[0]
          let message = this.dynMessages.get(auctionItemDetailId).toString().split('_')[1]
        this.showDynMessage(auctionItemDetailId,cssClass,message)
      }
      }
}
