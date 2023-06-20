import { AuctionItemDetail } from "./auction-item-detail"

export class LiveBidDetail {
    bidderId:number
    auctionItemDetail:AuctionItemDetail
    auctionDetailId:number
    currentBid:number
    maxBid:number
    itemColor:string
    increment:number
    l1Amount:number
}
