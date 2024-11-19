import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
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
