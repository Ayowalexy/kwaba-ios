import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../util';
const {width} = Dimensions.get('window');

const designs = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    backgroundColor: '#2A286A',
    // borderWidth: 1,
    // borderColor: 'red',
    // paddingTop: 27,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#BFBFBF50',
    borderBottomWidth: 1,

    // borderWidth: 1,
    // borderColor: 'red',
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondBar: {
    // backgroundColor: '#47448A',
    height: 42,
    // borderColor: '#ADADAD',
    // borderWidth: 0.5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
    paddingLeft: 16,
    borderBottomColor: '#BFBFBF50',
    borderBottomWidth: 1,
    backgroundColor: COLORS.primary,
    // backgroundColor: '#f4f4f4',
    backgroundColor: '#EDECFC',

    // marginTop: 8,
    // elevation: 10,
  },
  item: {
    width: width,
    justifyContent: 'center',
    marginTop: 15,
    paddingLeft: 16,
    paddingRight: 16,
  },
  bgImage: {
    // height: 139,
    // backgroundColor: 'white',
    borderRadius: 20,
    elevation: 10,
  },
  linearGradient: {
    // paddingLeft: 25,
    // paddingBottom: 15,
    padding: 20,
    // height: 139,
    // padding: 10,
    opacity: 0.95,
    borderRadius: 20,
    // borderWidth: 2,
    // borderColor: 'red',
    justifyContent: 'space-between',
    overflow: 'hidden',
    flex: 1,
  },

  bottom: {
    width: width,
    // height: 400,
    // marginTop: 27,
    // marginBottom: 27,
    backgroundColor: '#F7F8FD',
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    padding: 16,
    paddingBottom: 16,
  },
  cardItem: {
    backgroundColor: 'white',
    // padding: 20,
    // paddingRight: 0,
    // borderColor: '#EAEAEA',
    // borderWidth: 1,
    marginBottom: -5,
    // borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,

    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'hidden',

    position: 'relative',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.58,
    // shadowRadius: 16.0,
    // elevation: 1,
  },
});

export default designs;
