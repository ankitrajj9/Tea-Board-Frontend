import { ExitDetails } from "./exit-details"

export class ReportDetail {
    auctionItemDetailId:number
    lotNo:string
    basePrice:number
    reservePrice:number
    increment:number
    bidderId:number
    loginId:string
    l1Amount:number
    exitDetails:ExitDetails[]
}
