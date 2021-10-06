import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import LoanOfferContent from '../Payment/LoanOfferContent';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import SignatureScreen from 'react-native-signature-canvas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RNFS from 'react-native-fs';
import {color} from 'react-native-reanimated';
import PrintOfferLetter from '../Payment/PrintOfferLetter';

import {formatNumber} from '../../util/numberFormatter';

const OfferApprovalBreakDown = ({navigation}) => {
  const [modalVisible, setVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [eSignatureModal, setESignatureModal] = useState(false);
  const [acceptOfferResponse, setAcceptOfferResponse] = useState({});
  const [approvedAmount, setApprovedAmount] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [duration, setDuration] = useState('');

  const ref = useRef();

  useEffect(() => {
    const getToken = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const token = JSON.parse(userData).token;
      return token;
    };

    const setLoanOffer = async () => {
      const token = await getToken();
      const applicationIDCallRes = await axios.get(
        'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );

      setApprovedAmount(applicationIDCallRes.data.data.loanable_amount);
      setMonthlyPayment(applicationIDCallRes.data.data.monthly_repayment);
      setDuration(applicationIDCallRes.data.data.repayment_plan);

      console.log('Loanable: ', applicationIDCallRes.data.data);
    };

    setLoanOffer();
  });

  const handleSignature = async (signature) => {
    console.log('here is the image ' + signature);
    const getToken = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const token = JSON.parse(userData).token;
      return token;
    };

    // let widthtouse=Dimensions.get('window').width;
    // let heighttouse= Dimensions.get('window').height;

    // useEffect(()=>{
    //  console.log('hello here how are you '+widthtouse);
    // },[]);

    const path = RNFS.CachesDirectoryPath + 'sign.png';
    //const path2 = RNFS.cacheDirectory + 'sign.png';

    // RNFS.writeAsStringAsync(path, signature.replace('data:image/png;base64,', ''), {encoding: RNFS.EncodingType.Base64}).then(res => {
    //   console.log(res);
    //   RNFS.getInfoAsync(path, {size: true, md5: true}).then(file => {
    //     console.log(file);
    //   })
    // }).catch(err => {
    //   console.log("err", err);
    // })

    const token = await getToken();
    const applicationIDCallRes = await axios.get(
      'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/one',
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );

    console.log(applicationIDCallRes.data.data.id);
    console.log(applicationIDCallRes.data.data);
    const applicationId = applicationIDCallRes.data.data.id;

    try {
      const response = await axios.put(
        'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/accept_offer',
        {applicationId, signature},
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );

      let stepsdata = {
        documentdone: 'done',
        propertydetail: 'done',
        landlorddetail: 'done',
        refree: 'done',
        offeraccepted: 'done',
        addressverification: '',
        debitmandate: '',
        awaitingdisbursment: '',
      };

      await AsyncStorage.setItem('borrwsteps', JSON.stringify(stepsdata));
      console.log(response);
      setAcceptOfferResponse(response);
    } catch (error) {
      console.log(error.response.data);
    }
    setESignatureModal(false);
    setSuccessModal(true);
  };
  const handleEmpty = () => {
    console.log('Empty');
  };

  const handleClear = () => {
    console.log('clear success!');
  };

  const handleAcceptOfferClick = () => {
    setVisible(!modalVisible);
    setESignatureModal(true);
  };

  const handleRejectOffer = () => {
    Alert.alert('Offer Rejected', 'Offer Rejected.');
  };

  const style = `
    .m-signature-pad {
      flex:1;
      width: 400px;
      height: 600px;
    }   
    .m-signature-pad--footer
      .button {
        background-color: red;
        color: #FFF;
      }
      .m-signature-pad--footer
      .button.clear {
        font-family:CircularStd-Book;
        left: 0;
        background-color: #BFBFBF;
        width: 100px;
        height: 50px;
        margin-top:20px;
      }

    .m-signature-pad--footer
      .button.save {
        font-family:CircularStd-Book;
        right: 0;
        background-color: #00DC99;
        width: 100px;
        height: 50px;
        margin-top:20px;
      }

    .m-signature-pad--footer
        .description {
          color: #2A286A;
          text-align: center;
          font-size: 1.2em;
          margin-top: 1.8em;
          font-weight:bold;
        }
    `;

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{marginTop: 28, marginLeft: 25, fontWeight: '900'}}
        color={COLORS.primary}
      />

      <ScrollView>
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
                marginBottom: 24,
              },
            ]}>
            Rental Loan
          </Text>
          <Text
            style={{
              color: '#2A286A',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 18,
              lineHeight: 23,
              marginBottom: 14,
            }}>
            Here is your rent offer
          </Text>

          <View
            style={{
              borderRadius: 15,
              backgroundColor: COLORS.white,
              paddingHorizontal: 25,
              paddingVertical: 2,
            }}>
            {/* <View style={{flexDirection: 'row', paddingTop: 22, paddingBottom: 16, borderColor: COLORS.grey, borderBottomWidth: 1, justifyContent: 'space-between'}}>
            <Text style={designs.offerBoxLabels}>Rent request amount</Text><Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>₦200,000</Text>
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 22,
                paddingBottom: 16,
                borderColor: COLORS.grey,
                borderBottomWidth: 1,
                justifyContent: 'space-between',
              }}>
              <Text style={designs.offerBoxLabels}>Approved amount</Text>
              <Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>
                ₦{approvedAmount}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 22,
                paddingBottom: 16,
                borderColor: COLORS.grey,
                borderBottomWidth: 1,
                justifyContent: 'space-between',
              }}>
              <Text style={designs.offerBoxLabels}>Monthly payment:</Text>
              <Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>
                ₦{formatNumber(monthlyPayment)}
              </Text>
            </View>
            {/* <View style={{flexDirection: 'row', paddingTop: 22, paddingBottom: 16, borderColor: COLORS.grey, borderBottomWidth: 1, justifyContent: 'space-between'}}>
               <Text style={designs.offerBoxLabels}>Total repayment</Text><Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>₦210,000</Text>
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 22,
                paddingBottom: 40,
                borderColor: COLORS.grey,
                borderBottomWidth: 1,
                justifyContent: 'space-between',
              }}>
              <Text style={designs.offerBoxLabels}>Duration</Text>
              <Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>
                {duration}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 22,
                paddingBottom: 40,
                borderColor: COLORS.grey,
                borderBottomWidth: 1,
                justifyContent: 'space-evenly',
              }}>
              <View style={{flex: 2, flexDirection: 'column'}}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 15, color: '#2A286A'}}>
                  Fees
                </Text>
                <Text
                  style={[
                    designs.offerBoxLabels,
                    {
                      fontWeight: 'bold',
                      fontSize: 15,
                      color: '#465969',
                      marginTop: 10,
                    },
                  ]}>
                  Address verification{' '}
                </Text>
                <Text
                  style={[
                    {fontWeight: 'normal', fontSize: 12, color: '#465969'},
                  ]}>
                  This is to be paid once you accept our offer.
                </Text>
              </View>

              <View style={{alignSelf: 'flex-end'}}>
                <Text style={[{fontWeight: 'bold', color: '#465969'}]}>
                  ₦2,500
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingTop: 22,
                paddingBottom: 40,
                borderColor: COLORS.grey,
                borderBottomWidth: 1,
                justifyContent: 'space-evenly',
              }}>
              <View style={{flex: 2, flexDirection: 'column'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: '#2A286A',
                    lineHeight: 20,
                  }}>
                  Rent insurance
                </Text>

                <Text
                  style={[
                    {
                      fontWeight: 'normal',
                      fontSize: 12,
                      color: '#465969',
                      lineHeight: 20,
                    },
                  ]}>
                  This is to insure you against job loss or personal disability.
                  This will be deducted from the amount to be paid to your
                  landlord.
                </Text>
              </View>

              <View style={{}}>
                <Text style={[{fontWeight: 'bold', color: '#465969'}]}>
                  ₦2,500
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginBottom: 19,
            justifyContent: 'space-around',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={handleRejectOffer}
            style={[
              designs.button,
              {backgroundColor: COLORS.white, elevation: 6, width: '43%'},
            ]}>
            <Text
              style={[
                designs.buttonText,
                {
                  fontSize: 14,
                  color: '#ADADAD',
                  textAlign: 'center',
                  fontWeight: 'normal',
                },
              ]}>
              REJECT OFFER
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PostPaymentForm1');
            }}
            style={[
              designs.button,
              {backgroundColor: COLORS.secondary, elevation: 6, width: '43%'},
            ]}>
            <Text
              style={[
                designs.buttonText,
                {
                  fontSize: 14,
                  color: COLORS.white,
                  textAlign: 'center',
                  fontWeight: 'normal',
                },
              ]}>
              ACCEPT OFFER
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {}}
        style={{flex: 1, maxHeight: 600}}>
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

            <Text
              style={{
                fontSize: 16,
                lineHeight: 20,
                fontWeight: 'bold',
                color: COLORS.primary,
                textAlign: 'center',
              }}>
              Offer Letter
            </Text>

            {/* <ScrollView > */}
            {/* <LoanOfferContent /> */}
            <PrintOfferLetter />
            {/* </ScrollView> */}
            {/* <Text>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidu s dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, sit.
                </Text> */}
            <TouchableOpacity
              onPress={handleAcceptOfferClick}
              style={[
                designs.button,
                {
                  backgroundColor: COLORS.secondary,
                  elevation: 6,
                  width: '100%',
                  marginTop: 12,
                  alignSelf: 'center',
                },
              ]}>
              <Text
                style={[
                  designs.buttonText,
                  {
                    fontSize: 14,
                    color: COLORS.white,
                    textAlign: 'center',
                    fontWeight: 'normal',
                  },
                ]}>
                YES, ACCEPT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* here stays the modal */}

      <Modal visible={successModal} animationType="fade" transparent={true}>
        <View style={designs.centeredModalWrapper}>
          <View style={[designs.successModal, {borderRadius: 30}]}>
            <Icon
              style={{alignSelf: 'flex-end'}}
              onPress={() => setSuccessModal(false)}
              name="close-outline"
              size={30}
              color="#D6D6D6"
            />
            <Image
              source={icons.tick}
              style={{width: 84, height: 84, marginTop: 25}}
            />
            <Text style={designs.successModalBodyText}>Offer accepted</Text>
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
                navigation.navigate(
                  'AddressVerificationPayment',
                  acceptOfferResponse,
                );
              }}
              style={[
                designs.button,
                {
                  marginTop: 30,
                  width: '100%',
                  alignSelf: 'center',
                  backgroundColor: COLORS.secondary,
                },
              ]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 30,
                  textAlign: 'center',
                }}>
                SET UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View>
        <Modal
          visible={eSignatureModal}
          animationType="fade"
          transparent={true}>
          <SignatureScreen
            ref={ref}
            onOK={handleSignature}
            onEmpty={handleEmpty}
            onClear={handleClear}
            autoClear={true}
            descriptionText={'Sign above to confirm your Acceptamce'}
            webStyle={style}
          />
          <Text></Text>
        </Modal>
      </View>
    </View>
  );
};

export default OfferApprovalBreakDown;
