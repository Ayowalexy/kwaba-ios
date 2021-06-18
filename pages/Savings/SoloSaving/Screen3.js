import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
  Modal,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import {images, icons} from '../../../util/index';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {soloSaving} from '../../../redux/actions/savingsActions';
import {unFormatNumber, numberWithCommas} from '../../../util/numberFormatter';

import CardAndBankModal from './CardAndBankModal';
// import AddCardModal from '../../../components/addCardModal';
// import AddCardModal from './AddCardModal';

// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }

export default function Screen3({navigation}) {
  const store = useSelector((state) => state.soloSavingReducer);
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [locked, setLocked] = useState(true);

  const savings_target = store.savings_amount * Number(store.savings_tenure[0]);
  const savings_start_date = moment(store.savings_start_date).format(
    'MMM D, YYYY',
  );
  const savings_end_date = moment(store.savings_end_date).format('MMM D, YYYY');
  // const savings_start_date = moment(store.savings_start_date, 'YYYY-MM-DD');
  // const savings_end_date = moment(store.savings_end_date, 'YYYY-MM-DD');
  const toggleSwitch = () => {
    setLocked((previousState) => !previousState);
  };

  const [amountToSave, setAmountToSave] = useState(null);

  const [modal, setModal] = useState(false);
  const [addCardModal, setAddCardModal] = useState(false);

  const addCardAndBankModal = () => {
    // console.log('Adding card and bank...');
    setModal(true);
    // navigation.navigate('SoloSaving4');
    // setAddCardModal(true);
    // console.log(modal);
  };

  useEffect(() => {
    // console.log(locked);
    dispatch(soloSaving({locked: locked}));
  }, [locked]);

  useEffect(() => {
    const frequency = store.savings_frequency;
    const targetAmount = store.savings_target_amount;
    const tenure = store.savings_tenure;

    const locked_interest_rate = 0.08;
    const unlock_interest_rate = 0.07;

    const numberOfDaysInAMonth = 30;
    const numberOfWeeksInAMonth = 4;

    console.log('Freq:', frequency);
    console.log('Tenure:', tenure);

    if (frequency == 'Daily') {
      if (tenure.toLowerCase() == '1 year') {
        let amount_to_save = numberWithCommas(
          unFormatNumber(targetAmount) / (numberOfDaysInAMonth * 12),
        );
        setAmountToSave(amount_to_save);
      } else {
        let amount_to_save = numberWithCommas(
          unFormatNumber(targetAmount) / (numberOfDaysInAMonth * tenure[0]),
        );
        setAmountToSave(amount_to_save);
      }
    } else if (frequency == 'Weekly') {
      if (tenure.toLowerCase() == '1 year') {
        let amount_to_save = numberWithCommas(
          unFormatNumber(targetAmount) / (numberOfWeeksInAMonth * 12),
        );
        setAmountToSave(amount_to_save);
      } else {
        let amount_to_save = numberWithCommas(
          unFormatNumber(targetAmount) / (numberOfWeeksInAMonth * tenure[0]),
        );
        setAmountToSave(amount_to_save);
      }
    } else if (frequency == 'Monthly') {
      if (tenure.toLowerCase() == '1 year') {
        let amount_to_save = numberWithCommas(
          unFormatNumber(targetAmount) / 12,
        );
        setAmountToSave(amount_to_save);
      } else {
        let amount_to_save = numberWithCommas(
          unFormatNumber(targetAmount) / tenure[0],
        );
        setAmountToSave(amount_to_save);
      }
    }

    // console.log('Store:', store);
  }, []);

  return (
    <View style={designs.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <Text style={[designs.boldText, {marginTop: 15}]}>
          Review your saving details
        </Text>
        <View style={[designs.summaryBox, {paddingBottom: 16}]}>
          <View style={designs.whiteBox}>
            <View style={{marginTop: 16}}>
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 15,
                  fontWeight: '700',
                  color: '#9D98EC',
                  fontFamily: 'Circular Std',
                }}>
                SOLO SAVING
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#2A286A',
                  lineHeight: 23,
                  fontFamily: 'Circular Std',
                }}>
                {/* {new Date().getFullYear()} Rent */}
                {store.savings_title}
              </Text>
            </View>
            <Image
              style={{width: 61, height: 66}}
              source={images.maskGroup15}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
              paddingHorizontal: 10,
              // paddingLeft: 20,
              // borderWidth: 1,
            }}>
            <View style={designs.dataInfo}>
              <Text style={designs.key}>
                Amount To Save {store.savings_frequency}
              </Text>
              <Text style={designs.value}>
                ₦
                {numberWithCommas(
                  Number(unFormatNumber(amountToSave)).toFixed(2),
                ) || ' 0.00'}
              </Text>
            </View>
            <View style={[designs.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={designs.key}>Target Amount</Text>
              <Text style={designs.value}>
                ₦
                {numberWithCommas(
                  Number(unFormatNumber(store.savings_target_amount)).toFixed(
                    2,
                  ),
                ) || ' 0.00'}
              </Text>
            </View>
            <View style={designs.dataInfo}>
              <Text style={designs.key}>Frequency</Text>
              <Text style={designs.value}>{store.savings_frequency}</Text>
            </View>
            <View style={[designs.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={designs.key}>Start Date</Text>
              <Text style={designs.value}>{savings_start_date}</Text>
            </View>
            <View style={designs.dataInfo}>
              <Text style={designs.key}>End Date</Text>
              <Text style={designs.value}>{savings_end_date}</Text>
            </View>
            <View style={[designs.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={designs.key}>Interest Rate</Text>
              <Text style={designs.value}>{locked ? '8%' : '7%'} P.A</Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 23,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                lineHeight: 15,
                marginRight: 23,
              }}>
              Lock saving?
            </Text>
            <Switch
              trackColor={{false: 'white', true: 'white'}}
              thumbColor={locked ? '#00DC99' : '#ADADAD'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={locked}
            />
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              // height: 26,
              borderRadius: 13,
              backgroundColor: '#00000022',
              padding: 2,
              // paddingHorizontal: 5,
              // marginRight: 'auto',
              // marginLeft: 'auto',
              marginTop: 15,
              // marginBottom: 10,
            }}>
            <Text
              style={{
                color: '#FFE700',
                fontSize: 10,
                lineHeight: 13,
                fontWeight: 'bold',
                fontFamily: 'Circular Std',
                textAlign: 'center',
              }}>
              {locked
                ? ' Keep your rent savings locked to earn higher interest. However, if you withdraw your rent before the end date, you will attract a breaking fee.'
                : 'You will get a lower interest rate if you unlock your rent savings. However, you can withdraw your funds anytime for free'}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 100,
          }}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
          <Text
            style={{
              color: '#465969',
              fontSize: 12,
              lineHeight: 15,
              fontWeight: 'bold',
            }}>
            I agree to{' '}
            <Text style={{color: '#00DC99'}}>Terms and Conditions</Text>
          </Text>
        </View>
        <TouchableOpacity
          disabled={!toggleCheckBox}
          // onPress={() => navigation.navigate('SetUpPaymentPlan')}
          // onPress={() => navigation.navigate('SoloSaving4')}
          onPress={addCardAndBankModal}
          style={[
            designs.button,
            {
              marginTop: 15,
              // backgroundColor: toggleCheckBox ? '#00DC99' : '#EAEAEA',
              backgroundColor: '#00DC99',
            },
          ]}>
          <Text
            style={{
              // color: toggleCheckBox ? 'white' : '#000',
              color: toggleCheckBox ? '#fff' : '#ffffff50',
              fontWeight: 'bold',
              fontSize: 12,
              lineHeight: 30,
            }}>
            CONTINUE
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <CardAndBankModal
        onRequestClose={() => setModal(!modal)}
        visible={modal}
        store={store}
        navigation={navigation}
      />
    </View>
  );
}
