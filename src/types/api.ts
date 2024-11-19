export interface IAPIKlarna {
  region: 'EU' | 'NA' | 'OC';
  environment: 'demo' | 'playground' | 'production';
  clientId: string;
  placementKey: string;
  locale: string;
  purchaseAmount: number;
  version: string;
}
