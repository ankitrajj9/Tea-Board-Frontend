import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingDashboardNewComponent } from './bidding-dashboard-new.component';

describe('BiddingDashboardNewComponent', () => {
  let component: BiddingDashboardNewComponent;
  let fixture: ComponentFixture<BiddingDashboardNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddingDashboardNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiddingDashboardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
