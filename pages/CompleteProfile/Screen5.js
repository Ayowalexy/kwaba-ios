import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { icons, COLORS } from '../../util/index';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { formatNumber, unFormatNumber } from '../../util/numberFormatter';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { me } from '../../services/network';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import ConfirmModal from '../../components/modal';

import { getCurrentUser } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState } from '../../redux/actions/userActions';
import urls from '../../services/routes';
import DatePicker from 'react-native-datepicker'
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const completeProfileSchema = yup.object().shape({
  how_much_is_your_rent: yup.string().required('Please enter an amount'),
  when_is_your_next_rent_due: yup.string()
    .required('Select a date') 
});

const Screen5 = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.getUserReducer);
  const { navigation, route } = props;
  // const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('01-01-2022')

  const top = useSafeAreaInsets().top;


  const saveLoginToStorage = async (data) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) { }
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  // useEffect(() => {
  //   console.log('User: ', user);
  // }, [user]);

  // const handlegoNaviagte = async () => {
  //   const c = await AsyncStorage.getItem('completeProfileNextPage');
  //   if (c) {
  //     navigation.navigate(c);
  //   } else {
  //     navigation.navigate('Home');
  //   }

  // };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@completeProfilePage');
      if (value !== null) {
        // value previously stored
        navigation.navigate(value);
      } else {
        navigation.navigate('Home');
      }
    } catch (e) {
      // error reading value
      navigation.navigate('Home');
    }
  };

  const NumberInput = (props) => {
    const {
      field: { name, onBlur, onChange, value },
      form: { errors, touched, setFieldTouched },
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text style={styles.label}>How much is your rent?</Text>
        <View
          style={[
            styles.customInput,
            props.multiline && { height: props.numberOfLines * 40 },
            hasError && styles.errorInput,
          ]}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              position: 'absolute',
              left: 15,
              color: COLORS.dark,
            }}>
            ₦
          </Text>
          <TextInput
            style={{
              width: '100%',
              paddingLeft: 50,
              paddingVertical: 16,
            }}
            keyboardType="number-pad"
            value={formatNumber(value)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            onChangeText={(text) => onChange(name)(text)}
            {...inputProps}
          />
        </View>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const SelectDate = (props) => {
    const {
      field: { name, value },
      form: { errors, touched, setFieldValue },
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    const handleDateSelect = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDate(Platform.OS === 'ios');
      // setDate(currentDate);
      setFieldValue('when_is_your_next_rent_due', currentDate);
    };

    return (
      <>
        <Text style={styles.label}>When is your next rent due?</Text>
        {/* <TouchableOpacity
          style={[styles.customInput, {padding: 20}]}
          onPress={() => {
            setShowDate(true);
            setFieldValue('when_is_your_next_rent_due', date);
          }}>
          <Text
            style={{
              color: COLORS.primary,
            }}>
            {moment(date).format('YYYY-MM-DD')}
          </Text>

          <Image
            style={{width: 20, height: 20}}
            resizeMode="contain"
            source={icons.dateTimePicker}
          />
        </TouchableOpacity> */}

        {/* {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            onChange={handleDateSelect}
            mode="date"
            is24Hour={true}
            display="spinner"
          />
        )} */}

        <DatePicker
          style={{
            width: '100%',
            borderRadius: 5,
            backgroundColor: '#FFFFFF',
            borderColor: '#ADADAD50',
            borderWidth: 1,
            marginTop: 10,
            padding: 10
          }}
          date={date}
          mode="date"
          placeholder="select date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              // marginLeft: 36
              textAlign: 'right',
              borderWidth: 0,
              position: 'absolute',
              left: 0,
              paddingLeft: 10
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {
            setFieldValue('when_is_your_next_rent_due', date)
            setDate(date)
          }}
        />

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const data = JSON.parse(userData);
    return data;
  };

  const completeProfile = async (data) => {
    let updateData = {
      bvn: data.bvn,
      dob: data.dob,
      how_much_is_your_rent: unFormatNumber(data.how_much_is_your_rent),
      when_is_your_next_rent_due: data.when_is_your_next_rent_due,
      profile_complete: 1,
    };
    console.log('update data: ', updateData);
    const token = await getToken();
    try {
      setSpinner(true);
      // const url =
      //   'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/user/update_profile';
      const url = urls.auth.COMPLETE_PROFILE;
      const response = await axios.put(url, JSON.stringify(updateData), {
        headers: { 'Content-Type': 'application/json', Authorization: token },
      });
      if (response.status == 201) {
        const res = await me();
        setSpinner(false);
        setModalVisible(true);
        const userData = await getUserData();

        console.log('USERDATA: ', userData);
        console.log('RESPONSE DATA: ', res.data);

        console.log('Logged Data:', {
          ...userData,
          user: res.data,
          username: res.data.firstname,
        });

        saveLoginToStorage({
          ...userData,
          user: res.data,
          username: res.data.firstname,
        });

        dispatch(
          setLoginState({
            ...userData,
            user: res.data,
            username: res.data.firstname,
          }),
        );

        // dispatch(getCurrentUser());
        // navigation.navigate('CompleteProfile6');

        // console.log('Response: ', response.data);
      } else {
        console.log('Complete');
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }

    // console.log('The Data: ', data);
  };

  const handleSubmit = async (values) => {
    const complete_profile = await AsyncStorage.getItem('complete_profile');

    let data = {
      ...JSON.parse(complete_profile),
      ...values,
    };
    completeProfile(data);
  };

  return (
    <View style={[designs.container, { backgroundColor: '#F7F8FD', marginTop: Platform.OS === 'ios' ? top : 0 }]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{ fontWeight: '900' }}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
        <View
          style={{
            marginTop: 25,
          }}>
          <Text
            style={[
              designs.heading,
              {
                color: '#2A286A',
                textAlign: 'left',
                fontSize: 25,
                lineHeight: 32,
              },
            ]}>
            Complete your profile
          </Text>
          <Text
            style={[
              designs.body,
              {
                color: '#465969',
                textAlign: 'left',
                fontSize: 15,
                lineHeight: 19,
              },
            ]}>
            Provide your personal details
          </Text>

          <Formik
            validationSchema={completeProfileSchema}
            initialValues={{
              how_much_is_your_rent: '',
              when_is_your_next_rent_due: '',
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}>
            {({ handleSubmit, isValid, values, setValues }) => (
              <>
                <Field
                  component={NumberInput}
                  name="how_much_is_your_rent"
                  placeholder="Amount"
                />
                <Field
                  component={SelectDate}
                  name="when_is_your_next_rent_due"
                />

                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[designs.btn, { backgroundColor: '#00DC99' }]}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 14,
                      lineHeight: 30,
                    }}>
                    NEXT
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>

      <ConfirmModal
        onRequestClose={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        goNaviagte={getData}
      />

      <Spinner visible={spinner} size="large" />
    </View>
  );
};

export default Screen5;

const styles = StyleSheet.create({
  customInput: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: COLORS.dark,
    marginTop: 40,
    marginLeft: 2,
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 10,
    color: '#f00000',
    marginLeft: 5,
  },
  errorInput: {
    borderColor: '#f0000050',
  },
});
