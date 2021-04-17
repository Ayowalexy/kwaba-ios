import React, {useState,useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RentalLoanOffer = ({navigation}) => {

  const [accommodationStatus, setAccommodationStatus] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [modalVisible, setVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleNavigation = () => {
    const data = {
    accommodationStatus: accommodationStatus,
    salaryAmount: salaryAmount,
    };
    // try {
    //   dispatch(soloSaving(data));

    //   return navigation.navigate('SoloSaving2');
    // } catch (error) {}
  };

  useEffect(()=>{
   

    async function getData(){

      const postPaymentFormData = await AsyncStorage.getItem('postPaymentForm');
      console.log(postPaymentFormData);
    }

    getData();
  })


  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={20}
        style={{marginTop: 28, marginLeft: 25, fontWeight: '900'}}
        color= {COLORS.primary}
      />
        <View
          style={{
            marginVertical: 11,
            marginHorizontal: 16,
          }}>
          <Text
            style={[
              FONTS.h1FontStyling,
              {
                color: '#2A286A',
                textAlign: 'left',
                fontWeight: 'bold',
                marginBottom: 24
              },
            ]}>
            Rental Loan
          </Text>
          <Text
            style={
              {
                color: '#2A286A',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 18,
                lineHeight: 23,
                marginBottom: 14
              }
            }>
            Here is your rent offer
          </Text>
          <View style={{borderRadius: 15, backgroundColor: COLORS.white, paddingHorizontal: 25, paddingVertical: 2}}>
            <View style={{flexDirection: 'row', paddingTop: 22, paddingBottom: 16, borderColor: COLORS.grey, borderBottomWidth: 1, justifyContent: 'space-between'}}>
            <Text style={designs.offerBoxLabels}>Rent request amount</Text><Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>₦200,000</Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 22, paddingBottom: 16, borderColor: COLORS.grey, borderBottomWidth: 1, justifyContent: 'space-between'}}>
<Text style={designs.offerBoxLabels}>Approved amount</Text><Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>₦200,000</Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 22, paddingBottom: 16, borderColor: COLORS.grey, borderBottomWidth: 1, justifyContent: 'space-between'}}>
<Text style={designs.offerBoxLabels}>Monthly payment:</Text><Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>₦105,000</Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 22, paddingBottom: 16, borderColor: COLORS.grey, borderBottomWidth: 1, justifyContent: 'space-between'}}>
<Text style={designs.offerBoxLabels}>Total repayment</Text><Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>₦210,000</Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 22, paddingBottom: 40, borderColor: COLORS.grey, borderBottomWidth: 1, justifyContent: 'space-between'}}>
<Text style={designs.offerBoxLabels}>Duration</Text><Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>2 months</Text>
            </View>

          </View>
        
        
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginBottom: 19, justifyContent: 'space-around', alignItems: 'flex-end'}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('CompleteProfile3')}
            style={[designs.button, {backgroundColor: COLORS.white, elevation: 6, width: '43%'}]}>
            <Text style={[designs.buttonText, {fontSize: 14, color:'#ADADAD', textAlign: 'center', fontWeight: 'normal'}]}>REJECT OFFER</Text>
          </TouchableOpacity>    
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={[designs.button, {backgroundColor: COLORS.secondary, elevation: 6, width: '43%'}]}>
            <Text style={[designs.buttonText, {fontSize: 14, color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>ACCEPT OFFER</Text>
          </TouchableOpacity>    
            
            </View>  
        <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose ={()=>{}}>
                <View style={designs.modalWrapper}>
                    <View style={designs.modalView}>
                        <View style={[designs.modalHeader, {justifyContent: 'flex-end'}]}>
                        <Icon
              onPress={() => setVisible(!modalVisible)}
              style={{alignSelf: 'flex-end'}}
              name="close-outline"
              size={30}
              color="#465969"
            />
            </View>
            
            <View>
                <Text style={{fontSize: 16, lineHeight: 20, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center'}}>Offer Letter</Text>
                <Text>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidu s dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, sit.
                </Text>
                <TouchableOpacity
            onPress={() => {
                          setVisible(!modalVisible);
                          setSuccessModal(true)}
                        }
            style={[designs.button, {backgroundColor: COLORS.secondary, elevation: 6, width: '100%', marginTop: 12, alignSelf: 'center'}]}>
            <Text style={[designs.buttonText, {fontSize: 14, color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>YES, ACCEPT</Text>
          </TouchableOpacity>

                
            </View>
            </View>
            </View>



        </Modal>
        <Modal visible={successModal} animationType="fade" transparent={true}>
        <View
          style={designs.centeredModalWrapper}>
          <View style={[designs.successModal, {borderRadius: 30}]}>
            <Icon
              style={{alignSelf: 'flex-end'}}
              onPress={() => setSuccessModal(false)}
              name="close-outline"
              size={30}
              color="#D6D6D6"
            />
            <Image source={icons.tick} style={{width: 84, height: 84, marginTop: 25}}/>
            <Text style={designs.successModalBodyText}>
            Offer accepted
            </Text>
            <Text
              style={{
                color: '#ADADAD',
                fontSize: 12,
                lineHeight: 15,
                fontWeight: 'bold',
                marginTop: 6,
              }}>
              Set up your payment plan
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSuccessModal(false);
                navigation.navigate('SetUpPaymentPlan');
              }}
              style={[designs.button, {marginTop: 30, width: '100%', alignSelf: 'center', backgroundColor: COLORS.secondary}]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 30,
                  textAlign: 'center'
                }}>
                SET UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        


   </View>
  );
};

export default RentalLoanOffer;
