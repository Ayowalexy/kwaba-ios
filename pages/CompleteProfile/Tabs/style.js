import {StyleSheet} from 'react-native';
const designs = StyleSheet.create({
  textField: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#BFBFBF40',
    borderWidth: 1,
    marginTop: 10,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    color: '#555',
    elevation: 0.2,
  },
  customInput: {
    // height: 70,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#BFBFBF40',
    borderWidth: 1,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 0.2,
  },
});

export default designs;
