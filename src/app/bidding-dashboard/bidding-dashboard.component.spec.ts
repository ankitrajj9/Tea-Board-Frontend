import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingDashboardComponent } from './bidding-dashboard.component';

describe('BiddingDashboardComponent', () => {
  let component: BiddingDashboardComponent;
  let fixture: ComponentFixture<BiddingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddingDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiddingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
