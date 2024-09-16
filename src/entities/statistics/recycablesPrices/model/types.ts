export interface IRecycablePrice {
    id: number,
    isDeleted: boolean,
    salesApplicationsCount: number,
    purchaseApplicationsCount: number,
    publishedDate: Date,
    lotSize: number,
    latestDealPrice: number,
    deviationPercent: number,
    deviation: number,
    createdAt: Date,
    name: string,
    description: string,
    category: number
  }