import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const designs = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
    fontFamily: 'CircularStd',
  },
  header: {
    marginTop: 10,
    backgroundColor: '#2A286A',
    width: width * 0.9,
    height: 60,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    paddingTop: 12,
    paddingLeft: 20,
  },
  boldText: {
    fontSize: 18,
    lineHeight: 23,
    color: '#2A286A',
    fontFamily: 'CircularStd',
    fontWeight: 'bold',
  },
  textInput: {
    // width: width * 0.9,
    // height: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 13,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 13,
  },
  button: {
    width: width * 0.9,
    width: '100%',
    // height: 70,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // opacity: 1,
    backgroundColor: '#00DC99',
    // marginTop: 62,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    marginBottom: 20,
    // elevation: 6,
    paddingVertical: 13,
  },
  summaryBox: {
    minHeight: 200,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#2A286A',
    marginTop: 16,
    padding: 20,
  },
  whiteBox: {
    width: '100%',
    height: 66,
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    overflow: 'hidden',
  },
  data: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 30,
    paddingLeft: 6,
    paddingRight: 6,
  },
  key: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 15,
    color: 'white',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    color: 'white',
  },
  creditCard: {
    width: 365,
    height: 51,
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginTop: 26,
    padding: 19,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    fontFamily: 'Circular Std',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successModal: {
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 400,
    padding: 23,
  },
  soloSavingCard: {
    width: 380,
    height: 180,
    marginTop: 12,
    elevation: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  fadedBottom: {
    backgroundColor: '#9D98EC',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    height: 58,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 26,
  },
  circularProgress: {
    width: 97,
    height: 97,
    zIndex: 9,
    position: 'relative',
    top: 25,
    left: 20,
  },
  whiteCard: {
    width: 163,
    height: 150,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 17,
    marginLeft: 17,
  },
  displayFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 55,
    marginLeft: 5,
    marginRight: 5,
  },
  transactions: {
    marginTop: 16,
    backgroundColor: 'white',
    height: 306,
    width: width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  transactionTab: {
    width: 127,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  buddySavingCard: {
    width: width * 0.9,
    width: '100%',
    minHeight: 168,
    borderRadius: 10,
    backgroundColor: '#2A286A',
    marginTop: 8,
    padding: 16,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  progressBar: {
    width: 325,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 13,
    borderColor: 'white',
    paddingLeft: 0,
    height: 6,
  },
  buddyCard: {
    width: 372,
    height: 110,
    paddingLeft: 16,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 11,
    paddingTop: 4,
  },
  initials: {
    width: 27,
    height: 27,
    borderRadius: 50,
    backgroundColor: '#9D98EC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  small: {
    width: 150,
    // width: '100%',
    height: 70,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#00000014',
    elevation: 2,
    padding: 16,
    marginTop: 11,
  },
  faces: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 345,
    height: 55,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#9D98EC',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 16,
    opacity: 0.8,
  },
});

export default designs;
