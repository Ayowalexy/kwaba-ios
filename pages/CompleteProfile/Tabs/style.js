import {StyleSheet} from 'react-native';
const designs = StyleSheet.create({
  textField: {
    // height: 70,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    marginTop: 10,
    // paddingLeft: 22,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    color: '#555',
    // fontWeight: 'bold',
  },
  customInput: {
    // height: 70,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    // borderColor: '#f00',
    borderWidth: 1,
    marginTop: 10,
    // padding: 15,
    // paddingLeft: 22,
    // paddingRight: 19,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default designs;
