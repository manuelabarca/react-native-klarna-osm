export interface KlarnaMessageData {
  title: string;
  message: string;
  action?: string;
}

export interface KlarnaMessagingProps {
  clientId: string;
  placementKey: string;
  locale: string;
  purchaseAmount: number;
  version: string;
  region: 'EU' | 'NA' | 'OC'; // Región para la API
  onAction: (action: string) => void;
}
