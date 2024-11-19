import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
  topRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: 'row',
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  learnMore: {
    fontSize: 14,
    color: '#007aff',
    textDecorationLine: 'underline',
  },
});
