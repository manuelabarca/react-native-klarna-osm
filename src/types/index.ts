export interface IAPIKlarna {
  region: 'EU' | 'NA' | 'OC';
  environment: 'demo' | 'playground' | 'production';
  clientId: string;
  placementKey: string;
  locale: string;
  purchaseAmount: number;
  version: string;
}

export interface IWebviewModal {
  url: string;
  visible: boolean;
  closeText?: 'Cerrar';
  onClose: () => void;
}

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
