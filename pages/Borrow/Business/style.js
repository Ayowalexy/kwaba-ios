import {StyleSheet} from 'react-native';
import {COLORS} from '../../../util/index';

const designs = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    // borderWidth: 1,
    // borderColor: '#f00',
  },
  contentWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  formHeader: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyleA: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 5,
    marginTop: 5,
  },
  buttonContainer: {
    backgroundColor: '#FFFFFF',
    position: 'relative',
    bottom: 0,
    // borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    // height: 70,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    backgroundColor: '#00DC99',
    marginVertical: 10,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // marginBottom: 20,
    // elevation: 2,
  },
  textField: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    // marginBottom: 19,
    fontSize: 14,
    lineHeight: 30,
  },
  btnText: {
    fontSize: 14,
    color: COLORS.grey,
    textAlign: 'center',
  },
  customInput: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 5,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: COLORS.dark,
    marginTop: 15,
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
  },
  errorText: {
    fontSize: 10,
    color: '#f00000',
    marginLeft: 5,
  },
  errorInput: {
    borderColor: '#f0000050',
  },
});

export default designs;
