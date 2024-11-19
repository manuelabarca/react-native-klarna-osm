import { Modal, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { styles } from './styles';

const WebViewModal = ({
  url,
  visible,
  onClose,
}: {
  url: string;
  visible: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.webview_container}>
          <WebView source={{ uri: url }} style={styles.webview} />
          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default WebViewModal;
