import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionAuctioneerDashboardComponent } from './auction-auctioneer-dashboard.component';

describe('AuctionAuctioneerDashboardComponent', () => {
  let component: AuctionAuctioneerDashboardComponent;
  let fixture: ComponentFixture<AuctionAuctioneerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionAuctioneerDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionAuctioneerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
