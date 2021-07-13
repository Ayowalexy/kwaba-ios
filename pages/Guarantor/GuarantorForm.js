import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../util';

import {Formik, Field} from 'formik';
import * as yup from 'yup';

const guarantorFormSchema = yup.object().shape({
  full_name: yup.string().required('Field required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Field required'),
  phone_no: yup.string().required('Field required'),
});

export default function GuarantorForm({navigation}) {
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
            styles.customInput,
            props.multiline && {height: props.numberOfLines * 40},
            hasError && styles.errorInput,
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

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <View style={[styles.container]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{paddingVertical: 20, paddingHorizontal: 10}}
        color="#2A286A"
      />

      <Formik
        validationSchema={guarantorFormSchema}
        initialValues={{
          full_name: '',
          email: '',
          phone_no: '',
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}>
        {({handleSubmit, isValid, values, setValues}) => (
          <>
            <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
              <View style={[styles.content]}>
                <Text style={[styles.heading]}>Guarantor Details</Text>
                <View style={{marginTop: 10}}>
                  <Field
                    component={CustomInput}
                    placeholder="Full name"
                    name="full_name"
                  />
                  <Field
                    component={CustomInput}
                    placeholder="Email"
                    name="email"
                  />
                  <Field
                    component={CustomInput}
                    placeholder="Phone Number"
                    name="phone_no"
                  />
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                onPress={handleSubmit}
                // disabled={isError()}
                style={[styles.button, {backgroundColor: COLORS.secondary}]}>
                <Text
                  style={[
                    styles.buttonText,
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
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.white,
    backgroundColor: '#F7F8FD',
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 80,
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
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
  errorText: {
    fontSize: 10,
    color: '#f00000',
    marginLeft: 5,
  },
  errorInput: {
    borderColor: '#f0000050',
  },
  button: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    // marginHorizontal: 20,
    // elevation: 20,
    shadowColor: COLORS.secondary,
    marginBottom: 20,
    // marginTop: 50,
  },
  //   buttonInnerView: {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //   },
  buttonText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
