import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');

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
  },
  item: {
    width: width,
    justifyContent: 'center',
    marginTop: 150,
  },
  onboardingImage: {
    width: 160,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    color: '#2A286A',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  bgImage: {
    height: 443,
    resizeMode: 'cover',
    paddingLeft: 21,
    paddingTop: 50,
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
    color: '#ffff',
    marginTop: 30,
    textAlign: 'left',
  },
  skip: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 240,
    left: 200,
  },
  getStartedBtn: {
    width: 360,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#ffff',
    marginRight: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#2A286A',
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    fontSize: 14,
  },
  linkContainer: {
    marginTop: 15,
    marginRight: 16,
    marginLeft: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'CircularStd-Medium',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default designs;
