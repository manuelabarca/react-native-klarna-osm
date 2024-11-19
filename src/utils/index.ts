import { openBrowser } from '@swan-io/react-native-browser';
import type { IAPIKlarna } from '../types/api';

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

interface IOpenURL {
  url: string;
  barTintColor: '#FFF'; // in-app browser UI background color
  controlTintColor: '#000'; // in-app browser buttons color
}

export const openURL = (params: IOpenURL) => {
  openBrowser(params.url, {
    animationType: 'slide', // "fade" | "slide" (default to "slide")
    dismissButtonStyle: 'close', // "cancel" | "close" | "done" (default to "close")
    barTintColor: params.barTintColor, // in-app browser UI background color
    controlTintColor: params.controlTintColor, // in-app browser buttons color
  }).catch((error) => {
    console.error(error);
  });
};
