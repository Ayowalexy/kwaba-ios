<<<<<<< HEAD
import {StyleSheet,Dimensions} from 'react-native';

const widthTouse=Dimensions.get('window').width;
=======
import {StyleSheet} from 'react-native';
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50

const designs = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
    fontFamily: 'CircularStd',
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
    marginLeft: 16,
    marginRight: 16,
    elevation: 20,
  },
  textField: {
    height: 70,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    marginTop: 14,
    paddingLeft: 22,
<<<<<<< HEAD
    width:widthTouse*0.9,
    alignSelf:'center'
=======
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
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
<<<<<<< HEAD
    width: widthTouse*0.9,
    marginLeft:16
    
    
=======
    width: 370,
    marginRight: 'auto',
    marginLeft: 'auto',
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
  },
  image: {
    width: 129,
    height: 30,
<<<<<<< HEAD
    marginLeft: 16,
=======
    marginLeft: 32,
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
    marginTop: 59,
  },
  heading: {
    color: '#2A286A',
    fontFamily: 'CircularStd',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 30,
    marginLeft: 32,
    marginTop: 40,
  },
  body: {
    color: '#BFBFBF',
    fontFamily: 'CircularStd',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    marginLeft: 32,
    lineHeight: 30,
  },
  codeInput: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '900',
    elevation: 1,
    color: 'black',
  },
  codeInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 31,
    marginRight: 31,
    marginTop: 15,
  },
  counter: {
    width: 59,
    height: 27,
    backgroundColor: '#9D98EC',
    borderRadius: 14,
    marginTop: 52,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fingerPrint: {
    backgroundColor: 'white',
    width: 68,
    height: 70,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    color: '#BFBFBF',
  },
});
export default designs;
