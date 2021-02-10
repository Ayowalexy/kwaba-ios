import {StyleSheet} from 'react-native';

const designs = StyleSheet.create({
  test_style: {
    fontWeight: 'bold',
  },
  test_style_2: {
    textAlign: 'center',
  },
  image: {
    width: 94,
    height: 113,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2rem',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bgImageContainer: {
    width: '100%',
    marginTop: '68px',
  },
  innerView: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 31,
    marginRight: 31,
    marginTop: 122,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    height: 61,
    width: 61,
    borderRadius: '50%',
  },
  arrowFwd: {
    width: '100%',
    height: '100%',
  },
  bigText: {
    textAlign: 'left',
    color: '#ffff',
  },
  smallText: {
    color: '#ffff',
    textAlign: 'left',
  },
});

export default designs;
