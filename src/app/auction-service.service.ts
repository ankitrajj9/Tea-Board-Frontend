import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from  'rxjs';
import {HttpParams } from '@angular/common/http';
import { UserLogin } from './user-login';
import { AuctionDetail } from './auction-detail';
import { AuctionItemDetail } from './auction-item-detail';
import { PreBidDetail } from './pre-bid-detail';
import { LiveBidDetail } from './live-bid-detail';
import { ReportDetail } from './report-detail';
import { AuctionItemDetailDescription } from './auction-item-detail-description';
Observable;

@Injectable({
  providedIn: 'root'
})
export class AuctionServiceService {
  private teaboardBackEndUrl: string;

  constructor(private http: HttpClient) { 
    this.teaboardBackEndUrl = 'http://192.168.100.155:8080';
  }

  public saveUser(userLogin: UserLogin) {
    
    return this.http.post<any>(this.teaboardBackEndUrl+'/saveuser', userLogin);
  }

  public login(userLogin: UserLogin) {
    
    return this.http.post<any>(this.teaboardBackEndUrl+'/login', userLogin);
  }

  public findAuctions(): Observable<any[]> {
    return this.http.get<any[]>(this.teaboardBackEndUrl+`/getallauctions`);
  }
  public findLiveAuctions(): Observable<any[]> {
    return this.http.get<any[]>(this.teaboardBackEndUrl+`/getallliveauctions`);
  }
  public findPendingAuctions(): Observable<any[]> {
    return this.http.get<any[]>(this.teaboardBackEndUrl+`/getallpendingauctions`);
  }
  
  public getUserLoginByUserLoginId(userLoginId:number): Observable<UserLogin> {
    return this.http.get<UserLogin>(this.teaboardBackEndUrl+`/getuserbyuserloginid/${userLoginId}`);
  }
  public saveAuction(auctionDetail: AuctionDetail) {
    
    return this.http.post<any>(this.teaboardBackEndUrl+'/addauction', auctionDetail);
  }

  public approveAuction(auctionDetail: AuctionDetail):any {
    // const body = new HttpParams()
    //   .set('auctionId', auctionDetailId)
    //   .set('userId', userLoginId)
    return this.http.post<any>(this.teaboardBackEndUrl+'/aproveauction', auctionDetail);
  }

  public getAuctionByAuctionDetailId(auctionDetailId:number): Observable<AuctionDetail> {
    return this.http.get<AuctionDetail>(this.teaboardBackEndUrl+`/getauctionbyauctiondetailid/${auctionDetailId}`);
  }

  public uploadExcel(excelFormData:FormData) {
    return this.http.post<any>(this.teaboardBackEndUrl+'/uploadauctionitemexcel', excelFormData);
  }

  public getAuctionItems(auctionDetailId:number): Observable<AuctionItemDetail[]> {
    return this.http.get<AuctionItemDetail[]>(this.teaboardBackEndUrl+`/getauctionitems/${auctionDetailId}`);
  }

  public addPreBidDetails(preBidDetails:PreBidDetail[]) {
    return this.http.post<any>(this.teaboardBackEndUrl+'/addallprebiddetails', preBidDetails);
  }

  public getPreBidDetails(auctionDetailId:number,bidderId:number): Observable<PreBidDetail[]> {
    return this.http.get<PreBidDetail[]>(this.teaboardBackEndUrl+`/getprebiddetails/${auctionDetailId}/${bidderId}`);
  }

  public getLiveBidDetails(auctionDetailId:number,bidderId:number): Observable<LiveBidDetail[]> {
    return this.http.get<LiveBidDetail[]>(this.teaboardBackEndUrl+`/getbidderwiselivebiddetails/${auctionDetailId}/${bidderId}`);
  }

  public changeMaxBid(auctionItemDetailId: number,bidderId:number,maxBid:number):any {
     const body = new HttpParams()
       .set('auctionItemDetailId', auctionItemDetailId)
       .set('bidderId', bidderId)
       .set('maxBid', maxBid)
    return this.http.post<any>(this.teaboardBackEndUrl+'/changemaxbid', body);
  }

  public exitFromItem(auctionItemDetailId: number,bidderId:number):any {
    const body = new HttpParams()
       .set('auctionItemDetailId', auctionItemDetailId)
       .set('bidderId', bidderId)
    return this.http.post<any>(this.teaboardBackEndUrl+'/exitfromitem', body);
  }

  public getReportDetails(auctionDetailId:number): Observable<ReportDetail[]> {
    return this.http.get<ReportDetail[]>(this.teaboardBackEndUrl+`/getreportdetails/${auctionDetailId}`);
  }

  public copyAuction(auctionDetailId: number):any {
    const body = new HttpParams()
      .set('auctionDetailId', auctionDetailId)
   return this.http.post<any>(this.teaboardBackEndUrl+'/copyauction', body);
 }

 public searchAuctions(param,userLoginId): Observable<AuctionDetail[]>{
  return this.http.get<AuctionDetail[]>(this.teaboardBackEndUrl+`/searchauctions/${param}/${userLoginId}`);
}

public getItemDescriptions(auctionItemDetailIds:any): Observable<AuctionItemDetailDescription[]> {
  const body = new HttpParams()
      .set('auctionItemDetailIds', auctionItemDetailIds)
  return this.http.post<AuctionItemDetailDescription[]>(this.teaboardBackEndUrl+`/getitemdescriptions`,body);
}
}
