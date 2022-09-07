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
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    lineHeight: 30,
  },
  body: {
    color: '#707070',
    fontSize: 14,
    lineHeight: 22,

    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    marginTop: 10,
  },
  btn: {
    width: '100%',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    backgroundColor: '#00DC99',
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 15,
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
