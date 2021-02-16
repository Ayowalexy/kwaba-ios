import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');

const designs = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000050',
  },

  card: {
    width: 370,
    height: 317,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
  },
  image: {
    width: 81,
    height: 60,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  heading: {
    fontSize: 24,
    fontFamily: 'CircularStd-Bold',
    fontWeight: 'bold',
    lineHeight: 30,
  },
  body: {
    color: '#707070',
    fontSize: 16,
    lineHeight: 20,

    fontFamily: 'CircularStd-Book',
    fontWeight: '500',
    marginTop: 10,
  },
  btn: {
    height: 70,
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
    height: 70,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    marginTop: 14,
    paddingLeft: 22,
  },
  customInput: {
    height: 70,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    marginTop: 20,
    paddingLeft: 22,
    paddingRight: 19,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
});

export default designs;
