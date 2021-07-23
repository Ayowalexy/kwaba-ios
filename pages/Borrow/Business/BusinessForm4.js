import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {icons} from '../../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {formatNumber, unFormatNumber} from '../../../util/numberFormatter';
import BusinessSectorModal from './Modals/BusinessSectorModal';

import {Formik, Field} from 'formik';
import * as yup from 'yup';

const businessFormSchema = yup.object().shape({
  how_many_is_collected: yup.string().required('Please select options'),
});

export default function BusinessForm1({navigation}) {
  const [progress, setProgress] = useState(80);
  const [businessRegistrationType, setBusinessRegistrationType] = useState('');
  const [showBusinessSectorModal, setShowBusinessSectorModal] = useState(false);
  const [registration, setRegistration] = useState('');

  const [isActive, setActive] = useState([]);

  const PaymentCollected = (props) => {
    const payment_collected_list = [
      'Cash',
      'Bank transfer',
      'Point of sale (POS)',
      'Online',
      'All of the above',
    ];
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    const toggleAll = (item) => {
      if (isActive.indexOf(item) === -1) {
        setActive(payment_collected_list);
      } else {
        setActive([]);
      }
    };

    const toggle = (item) => {
      if (isActive.indexOf(item) === -1) {
        setActive([...isActive, item]);
      } else {
        let x = isActive.filter((e) => e != item);
        setActive(x);
        setActive(x.filter((e) => e != 'All of the above'));
      }
    };

    useEffect(() => {
      if (payment_collected_list.length - isActive.length == 1) {
        setActive(payment_collected_list);
      }

      console.log(isActive.toString());
      setFieldValue('how_many_is_collected', isActive.toString());
    }, [isActive]);

    return (
      <>
        <Text style={designs.label}>
          How do you collect payment for your business?{'\n'}
          <Text
            style={{fontSize: 12, fontWeight: 'normal', color: COLORS.grey}}>
            Select as many that apply
          </Text>
        </Text>
        {payment_collected_list.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              designs.buttonStyleA,
              {
                // borderColor: value == option ? COLORS.light : '#ADADAD50',
                borderColor:
                  isActive.indexOf(option) !== -1 ? COLORS.light : '#ADADAD50',
              },
            ]}
            onPress={() => {
              if (option.toLowerCase() == 'all of the above') {
                toggleAll(option);
              } else {
                toggle(option);
              }
            }}>
            <View>
              <Text
                style={[
                  designs.btnText,
                  {
                    // color: value == option ? COLORS.light : COLORS.grey,
                    fontWeight: value == option ? 'bold' : 'normal',
                    color:
                      isActive.indexOf(option) !== -1
                        ? COLORS.light
                        : COLORS.grey,
                  },
                ]}>
                {option}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {hasError && <Text style={designs.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const handleSubmit = async (values) => {
    const {how_many_is_collected} = values;
    const data = {
      how_many_is_collected,
    };

    const businessFormData = await AsyncStorage.getItem(
      'businessFormDataStore',
    );

    await AsyncStorage.setItem(
      'businessFormDataStore',
      JSON.stringify({...JSON.parse(businessFormData), ...data}),
    );

    console.log('BUSINESS: ', businessFormData);

    navigation.navigate('BusinessForm5');
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingVertical: 20, paddingHorizontal: 10}}
        color={COLORS.primary}
      />

      <Formik
        validationSchema={businessFormSchema}
        initialValues={{
          how_many_is_collected: '',
        }}
        onSubmit={handleSubmit}>
        {({handleSubmit, isValid, values}) => (
          <>
            <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
              <View
                style={{
                  paddingHorizontal: 10,
                  //   marginBottom: 10,
                }}>
                <Text
                  style={[
                    {
                      color: '#2A286A',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: 18,
                      marginLeft: 5,
                    },
                  ]}>
                  Rent Now, Pay Later
                </Text>
                <View style={designs.contentWrapper}>
                  <View style={designs.formHeader}>
                    <Text
                      style={[
                        FONTS.h3FontStyling,
                        {
                          color: COLORS.primary,
                          textAlign: 'left',
                          fontWeight: 'bold',
                          fontSize: 16,
                        },
                      ]}>
                      Financial details
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 12,
                          lineHeight: 15,
                          color: '#ADADAD',
                          marginRight: 15,
                        }}>
                        4 of 5
                      </Text>
                      <AnimatedCircularProgress
                        size={25}
                        width={5}
                        fill={progress}
                        rotation={0}
                        tintColor={COLORS.secondary}
                        backgroundColor="#D6D6D6"
                      />
                    </View>
                  </View>

                  {/*  */}

                  <Field
                    name="how_many_is_collected"
                    component={PaymentCollected}
                  />
                </View>
              </View>
            </ScrollView>
            <View style={designs.buttonContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
                // onPress={()=> navigation.navigate('BusinessForm5')}
                // disabled={isValid ? false : true}
                style={[
                  designs.button,
                  {
                    backgroundColor: isValid ? '#00DC99' : '#00DC9950',
                  },
                ]}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 12,
                    lineHeight: 30,
                    textTransform: 'uppercase',
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
