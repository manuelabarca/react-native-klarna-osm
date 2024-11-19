import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { styles } from './styles';
import type { IWebviewModal } from '../../types';

const WebViewModal = ({
  url,
  visible,
  onClose,
  closeText = 'Cerrar',
}: IWebviewModal) => {
  return (
    <Modal
      visible={visible}
      presentationStyle="pageSheet"
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>{closeText}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.webviewContainer}>
          <WebView source={{ uri: url }} style={styles.webview} />
        </View>
      </View>
    </Modal>
  );
};

export default WebViewModal;
