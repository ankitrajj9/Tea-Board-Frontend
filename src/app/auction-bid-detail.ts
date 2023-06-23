import { AuctionDetail } from "./auction-detail"
import { AuctionItemDetail } from "./auction-item-detail"
import { UserLogin } from "./user-login"

export class AuctionBidDetail {
    auctionBidDetailId:number
    auctionDetail:AuctionDetail
    auctionItemDetail:AuctionItemDetail
    userLogin:UserLogin
    maxBid:number
    cpAtMb:number
    cpAtExit:number
    isActive:number
    cstatus:number
    createdOn:string
    createdBy:number
    remarks:string
}
