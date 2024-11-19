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
      presentationStyle="pageSheet"
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.webview_container}>
          <WebView source={{ uri: url }} style={styles.webview} />
        </View>
      </View>
    </Modal>
  );
};

export default WebViewModal;
