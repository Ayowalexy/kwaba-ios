import {StyleSheet,Dimensions} from 'react-native';

const widthTouse=Dimensions.get('window').width;
const designs = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
    justifyContent: 'center',
    paddingTop: 200,
  },
  image: {
    width: 94,
    height: 113,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  bgImage: {
    height: 643,
    resizeMode: 'cover',
  },
  bgImageContainer: {
    height: 643,
    marginTop: 38,
  },
  innerView: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 31,
    marginRight: 20,
    marginTop: 128,
    justifyContent: 'space-between',
    // alignItems: 'center',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigText: {
    // textAlign: 'left',
    color: '#ffff',
  },
  smallText: {
    color: '#ffff',
    // textAlign: 'left',
  },
  getStartedBtn: {
    width: widthTouse*0.9,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#ffff',
    marginLeft: 16,
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
    marginTop: 20,
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
