import type { IAPIKlarna } from '../types';

export const getApiUrl = ({
  environment,
  region,
  clientId,
  locale,
  placementKey,
  purchaseAmount,
  version,
}: IAPIKlarna) => {
  let baseUrl = '';

  if (environment === 'production') {
    baseUrl =
      region === 'EU'
        ? 'https://api.klarna.com'
        : region === 'NA'
          ? 'https://api-na.klarna.com'
          : 'https://api-oc.klarna.com';
  } else {
    baseUrl =
      region === 'EU'
        ? 'https://api.playground.klarna.com'
        : region === 'NA'
          ? 'https://api-na.playground.klarna.com'
          : 'https://api-oc.playground.klarna.com';
  }

  return `${baseUrl}/messaging/${version}?client_id=${clientId}&placement_key=${placementKey}&locale=${locale}&purchase_amount=${purchaseAmount}`;
};
