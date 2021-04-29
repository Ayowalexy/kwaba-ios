import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const designs = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A286A',
    
  },
  backgroundImg: {
    width: width,
    alignSelf: 'flex-end',
    height: 234,
    paddingLeft: 16,
  },
  smallBox: {
    width: 160,
    height: 64,
    borderRadius: 10,
    borderColor: '#FFFFFF17',
    borderWidth: 1,
    paddingTop: 13,
    paddingLeft: 17,
    marginRight: 10,
    backgroundColor: '#2A286A',
    opacity: 0.9,
  },
  scrollContainer: {
    width: width,
    marginTop: 44,
    paddingRight: 20,
  },
  card: {
    width: width*0.9,
    height: 170,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginTop: 15,
    alignSelf:'center'
  },
  cardHeader: {
    color: '#2A286A',
    fontSize: 35,
    fontFamily: 'CircularStd',
    fontWeight: 'bold',
    lineHeight: 35,
  },
  cardFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  bodyText: {
    marginTop: 6,
    color: '#465969',
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '600',
    lineHeight: 15,
  },
});

export default designs;
