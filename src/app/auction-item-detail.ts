import { AuctionDetail } from "./auction-detail"

export class AuctionItemDetail {
    auctionItemDetailId:number
    auctionDetail:AuctionDetail
    serialNo:number
    lotNo:string
    category:string
    grade:string
    itemPackage:number
    basePrice:number
    reservePrice:number
    increment:number
    createdOn:string
    createdBy:number
    isActive:number
    cstatus:number
    schedulerCount:number
    currentPrice:number
}
