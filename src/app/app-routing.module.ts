import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { AuctioneerDashboardComponent } from './auctioneer-dashboard/auctioneer-dashboard.component';
import { BidderDashboardComponent } from './bidder-dashboard/bidder-dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { AuctionCreateComponent } from './auction-create/auction-create.component';
import { AuctionAuctioneerDashboardComponent } from './auction-auctioneer-dashboard/auction-auctioneer-dashboard.component';
import { AuctionBidderDashboardComponent } from './auction-bidder-dashboard/auction-bidder-dashboard.component';
import { BiddingDashboardComponent } from './bidding-dashboard/bidding-dashboard.component';
import { ApproveAuctionComponent } from './approve-auction/approve-auction.component';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'createuser', component: UserCreateComponent },
  { path: 'createauction', component: AuctionCreateComponent },
  { path: 'auctioneerdashboard', component: AuctioneerDashboardComponent },
  { path: 'bidderdashboard', component: BidderDashboardComponent },
  {path: 'auctionauctioneerdashboard/:auctionDetailId', component:AuctionAuctioneerDashboardComponent},
  {path: 'auctionbidderdashboard/:auctionDetailId', component:AuctionBidderDashboardComponent},
  {path: 'biddingdashboard/:auctionDetailId', component:BiddingDashboardComponent},
  {path: 'approveauction/:auctionDetailId', component:ApproveAuctionComponent},
  {path: 'reportdashboard/:auctionDetailId', component:ReportDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
