import { AuctionItemDetail } from "./auction-item-detail"
import { AuctionItemDetailDescription } from "./auction-item-detail-description"

export class LiveBidDetail {
    bidderId:number
    auctionItemDetail:AuctionItemDetail
    auctionItemDetailDescription:AuctionItemDetailDescription
    auctionDetailId:number
    currentBid:number
    maxBid:number
    itemColor:string
    increment:number
    l1Amount:number
}
