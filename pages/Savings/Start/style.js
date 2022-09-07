import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const designs = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A286A',
    // padding: 10,
  },
  backgroundImg: {
    width: '100%',
    alignSelf: 'flex-end',
    height: 234,
    paddingLeft: 16,
    borderWidth: 1,
  },
  smallBox: {
    width: 160,
    height: 64,
    borderRadius: 5,
    borderColor: '#FFFFFF50',
    borderWidth: 1,
    paddingTop: 13,
    paddingLeft: 17,
    marginRight: 10,
    // backgroundColor: '#2A286A90',
    backgroundColor: '#00000030',
    // opacity: 0.9,
  },
  scrollContainer: {
    width: '100%',
    marginTop: 20,
    // paddingRight: 20,
    // padding: 10,
    paddingVertical: 10,
  },
  card: {
    width: '100%',
    // height: 170,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    // paddingBottom: 10,
    // marginTop: 15,
    marginBottom: 20,
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'relative',
    elevation: 10,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  cardHeader: {
    color: '#2A286A',
    fontSize: 30,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    lineHeight: 35,
  },
  cardFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyText: {
    marginTop: 10,
    color: '#465969',
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    // lineHeight: 20,
  },
});

export default designs;
