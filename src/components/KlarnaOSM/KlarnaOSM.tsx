import React, { useEffect, useState } from 'react';
import { Alert, Linking, Text, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { getApiUrl } from '../../utils/api';
import type { IAPIKlarna } from '../../types/api';
import { styles } from './styles';

interface KlarnaOSMProps extends IAPIKlarna {}

const KlarnaOSM: React.FC<KlarnaOSMProps> = ({
  clientId,
  placementKey,
  locale,
  purchaseAmount,
  version,
  region,
  environment,
}: KlarnaOSMProps) => {
  const [messageData, setMessageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
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

        setMessageData(data);

        if (data.impression_url) {
          await registerImpression(data.impression_url);
        }
      } catch (err: any) {
        setError(err.message);
        Alert.alert('Error', 'There was a problem fetching Klarna messages.');
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
  ]);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!messageData) {
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

  return (
    <View style={styles.container}>
      {badgeNode?.url ? (
        <SvgUri uri={badgeNode.url} width={50} height={50} />
      ) : (
        <Text>Badge no disponible</Text>
      )}
      {textNode?.value && <Text style={styles.message}>{textNode.value}</Text>}
      {learnMoreNode?.url && (
        <TouchableOpacity onPress={() => Linking.openURL(learnMoreNode.url)}>
          <Text style={styles.learnMore}>Más información</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default KlarnaOSM;
