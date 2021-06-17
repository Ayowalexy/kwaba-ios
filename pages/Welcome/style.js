import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const designs = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 1.3,
    // paddingVertical: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  contentWrapper: {
    width: '100%',
    // borderColor: '#f0f',
    // backgroundColor: '#f0f',
    // borderWidth: 1,
    flex: 1,
  },
  roundSeconday: {
    width: '100%',
    // borderColor: 'green',
    // borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    zIndex: 0,
  },
  roundPrimary: {
    width: '100%',
    // borderColor: 'blue',
    // borderWidth: 1,
    flex: 1,
    marginTop: 80,
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
    padding: 20,
    paddingTop: 50,
  },

  circle: {
    width: screenHeight,
    height: screenHeight,
    // backgroundColor: 'red',
    borderRadius: screenHeight,
    position: 'absolute',
  },
});

export default designs;
