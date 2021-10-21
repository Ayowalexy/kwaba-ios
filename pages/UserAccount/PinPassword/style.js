import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../util';
const {width} = Dimensions.get('window');

const designs = StyleSheet.create({
  headline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.dark,
    lineHeight: 20,
    paddingLeft: 10,
    opacity: 0.8,
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    fontFamily: 'CircularStd',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    flex: 1,
    backgroundColor: '#f7f8fd',
    // overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  customInput: {
    // height: 70,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    marginTop: 10,

    width: '100%',
    // borderWidth: 1,
    position: 'relative',
  },
  btn: {
    // height: 70,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 16,
    // marginRight: 16,
    elevation: 1,
  },
  errorText: {
    fontSize: 10,
    color: '#f00000',
    marginLeft: 5,
  },
  errorInput: {
    borderColor: '#f0000050',
  },

  codeInput: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: '#EFEFEF',
    borderWidth: 2,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '900',
    // elevation: 1,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  codeInputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginLeft: 31,
    // marginRight: 31,
    marginTop: 15,
    paddingHorizontal: 40,
    // borderWidth: 1,
  },
});

export default designs;
