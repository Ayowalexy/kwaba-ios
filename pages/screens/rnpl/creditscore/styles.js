import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../util/index';

const designs = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 50,
  },
  topNav: {
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  customInput: {
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: COLORS.white,
  },

  boldText: {
    fontSize: 14,
    lineHeight: 23,
    color: '#2A286A',
    fontFamily: 'CircularStd',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 10,
    color: '#f00000',
    marginLeft: 5,
  },
  errorInput: {
    borderColor: '#f0000050',
  },

  button: {
    width: '100%',
    backgroundColor: '#212a33',
    backgroundColor: COLORS.primary,
    padding: 23,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
    textTransform: 'capitalize',
  },

  textWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subText: {
    fontSize: 14,
    color: COLORS.dark,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default designs;
