import { Component } from '@angular/core';
import { AuctionServiceService } from '../auction-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionDetail } from '../auction-detail';
import { AuctionItemDetail } from '../auction-item-detail';

@Component({
  selector: 'app-auction-auctioneer-dashboard',
  templateUrl: './auction-auctioneer-dashboard.component.html',
  styleUrls: ['./auction-auctioneer-dashboard.component.css']
})
export class AuctionAuctioneerDashboardComponent {

  uploadedExcel: File;
  auctionDetail:AuctionDetail
  userLoginId:any
  divHide:boolean=true
  auctionItems:AuctionItemDetail[]

  constructor(private auctionService: AuctionServiceService,private router: Router,private route:ActivatedRoute) { 
    this.userLoginId = window.localStorage.getItem('userLoginId');
  }
  auctionDetailId:any
  ngOnInit(): void {
    this.auctionDetailId=this.route.snapshot.params['auctionDetailId'];
    console.log(this.auctionDetailId)
    this.auctionService.getAuctionByAuctionDetailId(this.auctionDetailId).subscribe(data => {
      console.log(data)
      this.auctionDetail = data;
    });
    this.auctionService.getAuctionItems(this.auctionDetailId).subscribe(data => {
      console.log(data)
      this.auctionItems = data;
    });
  }

  public onExcelUpload(event:any) {
    this.uploadedExcel = event.target.files[0];
  }
  // public onImageUpload(event:any) {
  //   this.uploadedExcel = event.target.files[0];
  // }
  uploadExcel(){
    const excelFormData = new FormData();
    excelFormData.append('excelFile', this.uploadedExcel, this.uploadedExcel.name);
    excelFormData.append('auctionDetailId', this.auctionDetailId);
    excelFormData.append('userLoginId', this.userLoginId);
    this.auctionService.uploadExcel(excelFormData).subscribe(result => 
      {
        if(result.responseCode == 200){
          this.divHide=false
          this.setTimer()
          this.auctionService.getAuctionItems(this.auctionDetailId).subscribe(data => {
            console.log(data)
            this.auctionItems = data;
          });
          
        }
      }
    )
  }


  public setTimer(){
    setTimeout(()=>{
            this.divHide=true
       }, 5000);
     
    }

    public approveAuction(auctionDetailId:any){
      this.router.navigate([`approveauction/${auctionDetailId}`]);
    }

    public goToL1Report(auctionDetailId:any){
      this.router.navigate([`reportdashboard/${auctionDetailId}`]);
    }
}
