import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { getApiUrl } from '../../utils';
import type { IAPIKlarna } from '../../types';
import { styles } from './styles';
import WebViewModal from '../WebviewModal';

interface KlarnaOSMProps extends IAPIKlarna {
  style?: {
    container?: {};
    badge?: {};
    message?: {};
    learnMore?: {};
    loader?: {};
  };
  debug: Boolean;
}

const KlarnaOSM: React.FC<KlarnaOSMProps> = ({
  clientId,
  placementKey,
  locale,
  purchaseAmount,
  version,
  region,
  environment,
  style,
  debug,
}: KlarnaOSMProps) => {
  const [messageData, setMessageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isWebViewModalVisible, setWebViewModalVisible] =
    useState<boolean>(false);
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        if (debug) {
          console.log('Fetching message with the following parameters:', {
            clientId,
            placementKey,
            locale,
            purchaseAmount,
            version,
            region,
            environment,
          });
        }

        const response = await fetch(
          getApiUrl({
            clientId,
            placementKey,
            locale,
            purchaseAmount,
            version,
            region,
            environment,
          })
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error loading message.');
        }

        if (debug) {
          console.log('Received response data:', data);
        }

        setMessageData(data);

        if (data.impression_url) {
          await registerImpression(data.impression_url);
        }
      } catch (err: any) {
        setError(err.message);
        Alert.alert('Error', 'There was a problem fetching Klarna messages.');
        if (debug) {
          console.error('Error fetching data:', err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const registerImpression = async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.warn('Failed to register impression:', response.status);
        }
      } catch (err) {
        console.error('Error registering impression:', err);
      }
    };

    fetchMessage();
  }, [
    clientId,
    placementKey,
    locale,
    purchaseAmount,
    version,
    region,
    environment,
    debug,
  ]);

  const handleLearnMoreClick = (url: string) => {
    setWebViewUrl(url);
    setWebViewModalVisible(true);
  };

  if (isLoading) {
    if (debug) {
      console.log('Loading...');
    }
    return (
      <View style={StyleSheet.compose(styles.loader, style?.loader)}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    if (debug) {
      console.error('Error occurred:', error);
    }
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!messageData) {
    if (debug) {
      console.log('No message data available.');
    }
    return (
      <View style={styles.container}>
        <Text>Unable to load message.</Text>
      </View>
    );
  }

  const badgeNode = messageData.content.nodes.find(
    (node: any) => node.name === 'KLARNA_BADGE'
  );
  const textNode = messageData.content.nodes.find(
    (node: any) => node.name === 'TEXT_MAIN'
  );
  const learnMoreNode = messageData.content.nodes.find(
    (node: any) => node.name === 'ACTION_LEARN_MORE'
  );

  if (debug) {
    console.log('Badge Node:', badgeNode);
    console.log('Text Node:', textNode);
    console.log('Learn More Node:', learnMoreNode);
  }

  return (
    <View style={StyleSheet.compose(styles.container, style?.container)}>
      {badgeNode?.url ? (
        <SvgUri uri={badgeNode.url} width={40} height={40} />
      ) : (
        <Text>Badge no disponible</Text>
      )}
      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          {textNode?.value && (
            <Text style={StyleSheet.compose(styles.message, style?.message)}>
              {textNode.value}
            </Text>
          )}
        </View>

        {learnMoreNode?.url && (
          <TouchableOpacity
            style={styles.bottomRow}
            onPress={() => handleLearnMoreClick(learnMoreNode.url)}
          >
            <Text
              style={StyleSheet.compose(styles.learnMore, style?.learnMore)}
            >
              {learnMoreNode.label}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <WebViewModal
        url={webViewUrl || ''}
        visible={isWebViewModalVisible}
        onClose={() => setWebViewModalVisible(false)}
      />
    </View>
  );
};

export default KlarnaOSM;
