import { Component } from '@angular/core';
import { AuctionServiceService } from '../auction-service.service';
import { Router } from '@angular/router';
import { UserLogin } from '../user-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userLogin:UserLogin
  userLoginId:number
  userTypeId:number
  homeUrl:string=''
  text = '';
  auctions: any[];
  show = false;

  constructor(private auctionService: AuctionServiceService,private router: Router) {
    this.userLoginId=Number(window.localStorage.getItem('userLoginId'));
    this.userTypeId=Number(window.localStorage.getItem('userTypeId'));
    this.homeUrl = this.userTypeId == 1 ? '/auctioneerdashboard' : '/bidderdashboard'
    console.log(this.userLoginId)
   }

  ngOnInit(): void {
    this.auctionService.getUserLoginByUserLoginId(this.userLoginId).subscribe(data => {
      this.userLogin = data;
      console.log(data)
    });
  }

  searchAuction(obj) { // appending the updated value to the variable
    this.text = obj.target.value;
    console.log('test : ' + this.text);
    if(obj.target.value != undefined && obj.target.value != ''){
    this.auctionService.searchAuctions(this.text,this.userLoginId).subscribe(data => {
      this.auctions = data;
      if(Object.keys(this.auctions).length !== 0 ){
      this.show=true;
      }
      else{this.show=false;}
      console.log('result : ' + this.auctions);
    });
  }
  else{
    this.show=false;
  }
    
    
  }

  goToAuctionDashboard(auctionDetailId:number){
    if(this.userTypeId == 1){
    this.router.navigate([`/auctionauctioneerdashboard/${auctionDetailId}`]);
  }
  else{
    this.router.navigate([`/auctionbidderdashboard/${auctionDetailId}`]);
  }
  }
}
