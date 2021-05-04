import {StyleSheet} from 'react-native';
import {COLORS} from '../../util/index';


const designs = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,   
    
  },
  bgImage: {
    flex: 1,
    flex: 1,
  resizeMode: "cover",
  justifyContent: "center"
},
  contentView: {
    marginTop: 150,
    textAlign: 'center',
    paddingHorizontal: 25,
  },
  textView: {
    marginBottom: 52
  },
  bigText: {
    textAlign: 'center',
    color: COLORS.light,
  },
  smallHeaderText: {
    color: COLORS.white,
    textAlign: 'center',
    paddingHorizontal: 30
  },
  
  button: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    padding: 24,
    marginHorizontal: 20,
    elevation: 20,
    shadowColor: COLORS.secondary, 
    marginBottom: 40
  },
  buttonInnerView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18, 
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  // RentalLoan
contentWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginVertical: 17,
    paddingHorizontal: 20,
    paddingVertical: 15,
    
},
formHeader: {
    marginLeft: 3,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
},
buttonStyleA: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    textAlign: 'center',
    padding: 20,
    marginBottom: 19
  },
  textField: {
    
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        borderColor: '#EFEFEF',
        borderWidth: 1,
        textAlign: 'center',
        padding: 20,
        marginBottom: 19,
        fontSize: 16, 
        lineHeight: 30

      
  },
  btnText: {
    fontSize: 18, 
    color: COLORS.grey,
    textAlign: 'center'
  },
//   thirdPartyConnections
card: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 14,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 12
},
contentBox: {
    marginVertical: 25,
    marginHorizontal: 22,
    backgroundColor: COLORS.light,
    borderRadius: 15
},
smallTextBox: {
    flexDirection: 'row',
    textAlign: 'left',
    marginLeft: 20,
    alignItems: 'center'
},
smallText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: 'bold'
},
// linkingyouraccount

cardLYA: {
width: '95%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    paddingTop: 32,
    paddingLeft: 25,
    paddingRight: 25,
  },
  image: {
    width: 81,
    height: 60,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 10
  },
  heading: {
    fontSize: 24,
    fontFamily: 'CircularStd-Bold',
    fontWeight: 'bold',
    lineHeight: 30,
  },
  body: {
    color: '#707070',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'CircularStd-Book',
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 18,
    padding: 7
  },
  buttonStyleB: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    paddingVertical: 26,
    marginBottom: 26,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
  shadowOpacity: 0.26,
  shadowOffset: { width: 0, height: 2},
  shadowRadius: 10,
     
  },
  btnTextB: {
    fontSize: 14, 
    color: COLORS.white,
  },

//   thirdpartylink
customInput: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 18,
    paddingRight: 19,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
// rentalLoanDashboard
rlDisplay: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 11,
    marginBottom: 11
},
displayCard: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 8,
    justifyContent: 'space-between'
},
loanAmountBox: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#F7F8FD', 
    borderColor: '#EDECFC', 
    borderWidth: 1, 
    borderRadius: 10
},
repaymentTermsBox: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    backgroundColor: COLORS.white, 
    borderColor: '#FB8B24', 
    borderWidth: 1, 
    borderRadius: 15,
    marginBottom: 14
},
repaymentTermsContent: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
},
smallTextTitles: {
    fontSize: 10, 
    lineHeight: 13, 
    color: COLORS.primary,
    marginBottom: 6,
},
repaymentTermsValues: {
    fontSize: 14, 
    lineHeight: 20, 
    color: COLORS.primary,
    marginBottom: 2,
    fontWeight: 'bold',
},

//rentalLoanActive
activeLoanDashboard: {
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    padding: 10,
},
innerBoxTitles: {
    color: COLORS.light,
    fontSize: 12,
    marginBottom: 6,
    alignSelf: 'center',
    textAlign: 'center'
},
innerBoxValues: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 'auto'
},
circularProgress: {
    width: 97,
    height: 97,
    zIndex: 9,
    position: 'relative',
    top: -50,
    left: '35%',
    elevation: 25
  },


//rentalLoanBreakdown
paymentOptionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 37,
},

modalWrapper: {
    flex: 1,
        justifyContent: 'flex-end',
        fontFamily: 'Circular Std',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      
  },
  centeredModalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalView:{
    backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 23,
  },
  successModal: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    width: '90%',
    marginHorizontal: 'auto'
  },
  modalHeader: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 34
  },
  modalTitleText: {
        fontSize: 18,
        fontFamily: 'CircularStd-bold',
        lineHeight: 23,
        color: COLORS.primary,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12
  },
  modalBodyText: {
    fontSize: 15,
    fontFamily: 'CircularStd-bold',
    lineHeight: 19,
    color: COLORS.primary,
    marginBottom: 30
  },
  successModalBodyText: {marginTop: 35, 
    fontSize: 22, 
    lineHeight: 33, 
    color: COLORS.primary, 
    fontWeight: 'bold'},

  flexRow: {
      flexDirection: 'row'
  },
  offerBoxLabels: {
      fontSize: 15,
      lineHeight: 15,
      color: COLORS.primary
  },

//   payment
paymentMethodImage: {
    width: 184, 
    height: 152, 
    marginBottom: 26, 
    alignSelf: 'center'},

    dropDownPicker: {
      paddingVertical: 25, 
      paddingHorizontal: 16, 
      borderBottomStartRadius: 10,
      borderBottomEndRadius: 10,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
      
    },
    modalInnerView: {
      flexDirection: 'row',
      paddingHorizontal: 5
  },
  modalSmallTitle: {
      fontSize: 12,
      lineHeight: 15,
      color: '#ADADAD', 
      width: '50%',
      marginBottom: 2  
  },
  modalInnerValues: {
    fontSize: 15,
    lineHeight: 19,
    color: COLORS.primary, 
    fontWeight: 'bold',
    width: '50%',
    marginBottom: 27
  },
});



export default designs;