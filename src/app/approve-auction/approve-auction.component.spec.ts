import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAuctionComponent } from './approve-auction.component';

describe('ApproveAuctionComponent', () => {
  let component: ApproveAuctionComponent;
  let fixture: ComponentFixture<ApproveAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveAuctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
