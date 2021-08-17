import {StyleSheet} from 'react-native';
import {COLORS} from '../../util';
const designs = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 100,
  },
  topNav: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  topNavLogo: {},
  topNavAddress: {},
  userAddress: {
    marginTop: 20,
  },
  flexItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    // paddingBottom: 10,
    paddingLeft: 5,
    borderBottomColor: '#BFBFBF50',
    borderBottomWidth: 1,
  },
  flexItemText: {
    fontSize: 12,
    color: COLORS.primary,
    flex: 1,
    lineHeight: 25,
  },
  button: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    // marginHorizontal: 20,
    // elevation: 20,
    shadowColor: COLORS.secondary,
    // marginBottom: 20,
    // marginTop: 50,
  },
});
export default designs;
