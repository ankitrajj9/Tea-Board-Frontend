import { AuctionDetail } from "./auction-detail"
import { AuctionItemDetail } from "./auction-item-detail"
import { UserLogin } from "./user-login"

export class AuctionItemL1Detail {
    auctionItemL1DetailId:number
    auctionDetail:AuctionDetail
    auctionItemDetail:AuctionItemDetail
    bidderId:UserLogin
    cstatus:number
    amount:number
}
