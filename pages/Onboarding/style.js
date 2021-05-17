import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

const designs = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
    justifyContent: 'center',
  },
  image: {
    width: 129,
    height: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    marginBottom: 20,
  },
  item: {
    width: width,
    // justifyContent: 'center',
    // marginTop: 150,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  onboardingImage: {
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    // marginTop: 30,
  },
  title: {
    color: '#2A286A',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  bgImage: {
    height: 400,
    width: width,
    resizeMode: 'cover',
    paddingLeft: 21,
    paddingTop: 50,
    position: 'absolute',
    bottom: 0,
    // borderWidth: 1,
  },
  bgImageContainer: {
    height: 434,
    marginTop: 68,
  },
  innerView: {
    marginRight: 68,
  },
  button: {
    height: 61,
    width: 61,
    borderRadius: 50,
    opacity: 0.7,
    backgroundColor: '#00000000',
  },
  arrowFwd: {
    width: 61,
    height: 61,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF77',
    marginTop: 30,
  },
  bigText: {
    color: '#ffff',
  },
  smallText: {
    width: '80%',
    color: '#ffff',
    // marginTop: 30,
    textAlign: 'left',
    fontSize: 15,
    lineHeight: 25,
  },
  skip: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // top: 240,
    // left: 200,
    // backgroundColor: '#f00',
    // bottom: 0,
    marginTop: 50,
    // marginBottom: 50,
  },
  getStartedBtn: {
    width: width * 0.9,
    // height: 70,
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#ffff',
    marginRight: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#2A286A',
    fontFamily: 'CircularStd-Medium',
    fontWeight: 'bold',
    fontSize: 14,
  },
  linkContainer: {
    width: '100%',
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'CircularStd-Medium',
    fontSize: 14,
    fontWeight: '600',
    // borderWidth: 1,
  },
});

export default designs;
