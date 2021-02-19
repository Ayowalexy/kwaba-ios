import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const designs = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'CircularStd',
    backgroundColor: '#2A286A',
    paddingTop: 27,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 16,
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondBar: {
    backgroundColor: '#47448A',
    height: 42,
    // borderColor: '#ADADAD',
    borderWidth: 0.5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
    paddingLeft: 16,
    marginTop: 8,
    elevation: 10,
  },
  item: {
    width: width,
    justifyContent: 'center',
    marginTop: 15,
    paddingLeft: 16,
    paddingRight: 16,
  },
  bgImage: {
    height: 139,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 10,
  },
  linearGradient: {
    paddingLeft: 25,
    paddingBottom: 15,
    height: 139,
    opacity: 0.95,
    borderRadius: 20,
  },

  bottom: {
    width: width,
    height: 400,
    marginTop: 27,
    backgroundColor: '#F7F8FD',
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    padding: 16,
  },
  cardItem: {
    backgroundColor: 'white',
    height: 169,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    paddingLeft: 17,
    paddingTop: 17,
    opacity: 1,
    shadowColor: '#F7F8FD',
    marginTop: 3,
    borderTopColor: '#F7F8FD',
    shadowOpacity: 0.5,
  },
});

export default designs;
