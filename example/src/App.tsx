import { StyleSheet, View } from 'react-native';
import { KlarnaOSM } from 'react-native-klarna-osm';

export default function App() {
  return (
    <View style={styles.container}>
      <KlarnaOSM
        clientId="90245094-73f7-5e6e-ad8f-714cabc16708"
        placementKey="credit-promotion-badge"
        locale="es-ES"
        purchaseAmount={3000}
        version="v3"
        region="EU"
        environment="playground"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
