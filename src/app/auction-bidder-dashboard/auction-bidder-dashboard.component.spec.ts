import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionBidderDashboardComponent } from './auction-bidder-dashboard.component';

describe('AuctionBidderDashboardComponent', () => {
  let component: AuctionBidderDashboardComponent;
  let fixture: ComponentFixture<AuctionBidderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionBidderDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionBidderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
