import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../../../util/index';
import designs from './styles';
import {COLORS, FONTS, images} from '../../../../util/index';
import CountrySelect from '../../../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setCurrentStage } from '../../../../redux/reducers/store/stageActions';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

import RnplStepProgress from '../RnplStepProgress';

const rentalLoanFormSchema = yup.object().shape({
  employer_name: yup.string().required('Field required'),
  company_street_name: yup.string().required('Field required'),
  company_city_name: yup.string().required('Field required'),
  company_state_name: yup.string().required('Field required'),
  company_country_name: yup.string().required('Field required'),
});

const Form2 = ({navigation}) => {
  const [employersName, setEmployersName] = useState('');
  const [
    companyAddressNumberAndStreet,
    setCompanyAddressNumberAndStreet,
  ] = useState('');
  const [companyAddressCity, setCompanyAddressCity] = useState('');
  const [companyAddressState, setCompanyAddressState] = useState('');
  const [companyAddressCountry, setCompanyAddressCountry] = useState('');
  const [progress, setProgress] = useState(66);
  const dispatch = useDispatch();

  const isError = () => {
    if (
      employersName.trim().length == 0 ||
      companyAddressNumberAndStreet.trim().length == 0 ||
      companyAddressCity.trim().length == 0 ||
      companyAddressState.trim().length == 0 ||
      companyAddressCountry.trim().length == 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (values) => {
    const data = {
      employer_name: values.employer_name,
      // employer_address: `${companyAddressNumberAndStreet} ${companyAddressCity} ${companyAddressState} ${companyAddressCountry} `,
      employer_address: `${values.company_street_name} ${values.company_city_name} ${values.company_state_name} ${values.company_country_name}`,
    };
    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');

    await AsyncStorage.setItem(
      'rentalLoanForm',
      JSON.stringify({...JSON.parse(loanFormData), ...data}),
    );

    console.log(loanFormData);
    dispatch(setCurrentStage(stepsArray))

    navigation.navigate('Form3');
  };

  const CustomInput = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <View
          style={[
            designs.customInput,
            props.multiline && {height: props.numberOfLines * 40},
            hasError && designs.errorInput,
          ]}>
          <TextInput
            style={{
              width: '100%',
              paddingHorizontal: 16,
              paddingVertical: 16,
            }}
            keyboardType="default"
            value={value}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            onChangeText={(text) => onChange(name)(text)}
            {...inputProps}
          />
        </View>

        {hasError && <Text style={designs.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  return (
    <RnplStepProgress>
      <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <Formik
              validationSchema={rentalLoanFormSchema}
              initialValues={{
                employer_name: '',
                company_street_name: '',
                company_city_name: '',
                company_state_name: '',
                company_country_name: '',
              }}
              onSubmit={(values) => {
                handleSubmit(values);
              }}>
              {({handleSubmit, isValid, values, setValues}) => (
                <>
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
                        Financial Details
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: 12,
                            lineHeight: 15,
                            color: '#ADADAD',
                            marginRight: 15,
                          }}>
                          2 of 3
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

                    <>
                      <Text
                        style={[
                          FONTS.body1FontStyling,
                          {
                            color: COLORS.dark,
                            marginBottom: 0,
                            marginTop: 20,
                            fontSize: 14,
                          },
                        ]}>
                        What’s the name of the company you work for?{' '}
                      </Text>
                      <Field
                        component={CustomInput}
                        name="employer_name"
                        placeholder="Employer's name"
                      />
                    </>

                    <>
                      <Text
                        style={[
                          FONTS.body1FontStyling,
                          {
                            color: COLORS.dark,
                            marginBottom: 0,
                            marginTop: 20,
                            fontSize: 14,
                          },
                        ]}>
                        Address of the company?
                      </Text>

                      <Field
                        component={CustomInput}
                        name="company_street_name"
                        placeholder="Number and street name"
                      />

                      <Field
                        component={CustomInput}
                        name="company_city_name"
                        placeholder="City"
                      />

                      <Field
                        component={CustomInput}
                        name="company_state_name"
                        placeholder="State"
                      />

                      <Field
                        component={CustomInput}
                        name="company_country_name"
                        placeholder="Country"
                      />
                    </>
                  </View>

                  <TouchableOpacity
                    onPress={handleSubmit}
                    // disabled={isError()}
                    style={[
                      designs.button,
                      {backgroundColor: COLORS.secondary},
                    ]}>
                    <Text
                      style={[
                        designs.buttonText,
                        {
                          color: COLORS.white,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 12,
                        },
                      ]}>
                      NEXT
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    </RnplStepProgress>
  );
};


const stepsArray = [
  {
    title: 'Credit score',
    subTitle: '',
    status: 'complete',
  },
  {
    title: 'Applications',
    subTitle: '',
    status: 'complete',
  },
  {
    title: 'Documents upload',
    subTitle: '',
    status: 'complete',
  },
  {
    title: 'Offer approval breakdown',
    subTitle: '',
    status: 'complete',
  },
  {
    title: 'Property details',
    subTitle: '',
    status: 'locked',
  }
];

export default Form2;

