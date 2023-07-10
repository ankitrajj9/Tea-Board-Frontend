import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserCreateComponent } from './user-create/user-create.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from "@angular/material/card";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from "@angular/material/button";
import { MatListModule} from '@angular/material/list'
import { MatIconModule} from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu';
import { BidderDashboardComponent } from './bidder-dashboard/bidder-dashboard.component';
import { AuctioneerDashboardComponent } from './auctioneer-dashboard/auctioneer-dashboard.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule } from '@angular/material/toolbar';
import { TokenInterceptorService } from './token-interceptor.service';
import { AuctionServiceService } from './auction-service.service';
import { LogoutComponent } from './logout/logout.component';
import { AuctionBidderDashboardComponent } from './auction-bidder-dashboard/auction-bidder-dashboard.component';
import { AuctionAuctioneerDashboardComponent } from './auction-auctioneer-dashboard/auction-auctioneer-dashboard.component';
import { AuctionCreateComponent } from './auction-create/auction-create.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { BiddingDashboardComponent } from './bidding-dashboard/bidding-dashboard.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ApproveAuctionComponent } from './approve-auction/approve-auction.component';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
import { BiddingDashboardNewComponent } from './bidding-dashboard-new/bidding-dashboard-new.component';
import {ToastrModule} from 'ngx-toastr'


@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    LoginComponent,
    BidderDashboardComponent,
    AuctioneerDashboardComponent,
    HeaderComponent,
    LogoutComponent,
    AuctionBidderDashboardComponent,
    AuctionAuctioneerDashboardComponent,
    AuctionCreateComponent,
    BiddingDashboardComponent,
    ApproveAuctionComponent,
    ReportDashboardComponent,
    BiddingDashboardNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatButtonToggleModule,
    MatExpansionModule,
    ToastrModule.forRoot()
  ],
  providers: [AuctionServiceService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
