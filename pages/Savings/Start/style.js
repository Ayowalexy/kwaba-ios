import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const designs = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A286A',
<<<<<<< HEAD
    
=======
    paddingLeft: 16,
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
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
<<<<<<< HEAD
    width: width*0.9,
=======
    width: 380,
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
    height: 170,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginTop: 15,
<<<<<<< HEAD
    alignSelf:'center'
=======
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
  },
  cardHeader: {
    color: '#2A286A',
    fontSize: 35,
    fontFamily: 'CircularStd',
    fontWeight: 'bold',
    lineHeight: 35,
  },
  cardFlex: {
<<<<<<< HEAD
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
=======
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
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
