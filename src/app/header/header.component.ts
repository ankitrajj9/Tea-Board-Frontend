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
}
