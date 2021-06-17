import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');

const designs = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000050',
    padding: 20,
  },

  card: {
    width: '100%',
    // height: 317,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // paddingTop: 40,
    // paddingLeft: 40,
    // paddingRight: 40,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 'auto',
    marginLeft: 'auto',
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 24,
    fontFamily: 'CircularStd-Bold',
    fontWeight: 'bold',
    lineHeight: 30,
  },
  body: {
    color: '#707070',
    fontSize: 14,
    lineHeight: 22,

    fontFamily: 'CircularStd-Book',
    fontWeight: '500',
    marginTop: 10,
  },
  btn: {
    // height: 70,
    padding: 20,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    // height: 70,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    marginTop: 10,
    // paddingLeft: 22,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  customInput: {
    // height: 70,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    // borderColor: '#f00',
    borderWidth: 1,
    marginTop: 10,
    // padding: 15,
    // paddingLeft: 22,
    // paddingRight: 19,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: {
    width: 20,
    height: 20,
    borderRadius: 50,
    position: 'absolute',
    right: 20,
  },

  input: {
    // borderColor: 'blue',
    // borderWidth: 1,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default designs;
