import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const designs = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
    // paddingTop: 20,
    // paddingLeft: 16,
    // paddingRight: 16,
    padding: 15,
    fontFamily: 'CircularStd',
    // borderWidth: 2,
    // borderColor: 'red',
  },
  header: {
    marginTop: 22,
    backgroundColor: '#2A286A',
    width: 379,
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
    width: 380,
    height: 70,
    padding: 20,
    marginTop: 13,
    backgroundColor: 'white',
    borderRadius: 10,
    // borderColor: '#EAEAEA',
    borderColor: '#ADADAD50',
    borderWidth: 1,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 13,
  },
  button: {
    width: 380,
    height: 70,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    backgroundColor: '#00DC99',
    marginTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    // elevation: 2,
  },
  summaryBox: {
    height: 400,
    width: 380,
    borderRadius: 20,
    backgroundColor: '#2A286A',
    marginTop: 16,
    padding: 23,
  },
  whiteBox: {
    width: 334,
    height: 66,
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 27,
  },
  data: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 16,
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
    fontSize: 16,
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
    justifyContent: 'center',
    // alignItems: 'center',
    fontFamily: 'Circular Std',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: 16,
    paddingRight: 16,
  },
  successModal: {
    backgroundColor: 'white',
    borderRadius: 16,
    height: 400,
    padding: 23,
  },
  soloSavingCard: {
    width: '100%',
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
    // left: 20,
  },
  whiteCard: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 17,
  },
  displayFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 55,
    // marginLeft: 16,
    // marginRight: 16,
    // paddingHorizontal: 15,
  },
  transactions: {
    marginTop: 16,
    backgroundColor: 'white',
    height: 306,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  transactionTab: {
    // width: '100%',
    // height: 32,
    flex: 1,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default designs;
