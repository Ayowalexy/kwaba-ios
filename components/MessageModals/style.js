import {StyleSheet} from 'react-native';
import {COLORS} from '../../util/index';

const designs = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    zIndex: 9,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    padding: 20,
  },
  closeBtn: {
    backgroundColor: '#FFFFFF70',
    width: 30,
    height: 30,
    borderRadius: 20,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 99,
  },
  closeIcon: {
    fontSize: 18,
    color: COLORS.black,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 30,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  content: {
    paddingLeft: 42,
  },
});

export default designs;
