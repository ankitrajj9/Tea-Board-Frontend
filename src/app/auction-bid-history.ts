import { AuctionBidDetail } from "./auction-bid-detail"
import { AuctionDetail } from "./auction-detail"

export class AuctionBidHistory {
    auctionBidHistoryId:number
    auctionDetail:AuctionDetail
    auctionBidDetail:AuctionBidDetail
    createdOn:string
    createdBy:number
    bidAmount:number
}
