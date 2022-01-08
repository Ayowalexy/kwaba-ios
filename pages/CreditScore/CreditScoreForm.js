import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../util';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import AcceptModal from './AcceptModal';

const CreditScoreValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  bvn: yup.string().required('BVN is required'),
});

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
            // paddingLeft: 50,
            paddingHorizontal: 16,
            paddingVertical: 16,
            color: COLORS.white,
          }}
          placeholderTextColor={'#a5c2d180'}
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

export default function CreditScoreForm({navigation}) {
  const [spinner, setSpinner] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const handleSubmit = async (values) => {
    const data = {
      email: values.email,
      bvn: values.bvn,
      company: 'Kwaba',
    };

    console.log('The Data: ', data);
    setShowAcceptModal(true);
  };

  return (
    <>
      <StatusBar backgroundColor={'#10131B'} />
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderBottomColor: '#2b273550',
            borderBottomWidth: 1,
          }}>
          <Icon
            name="chevron-back"
            color={COLORS.white}
            size={20}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{paddingHorizontal: 20, paddingVertical: 20, flex: 1}}>
          <Formik
            validationSchema={CreditScoreValidationSchema}
            initialValues={{email: '', bvn: ''}}
            onSubmit={(values) => {
              handleSubmit(values);
            }}>
            {({handleSubmit, isValid, values, setValues}) => (
              <>
                <View style={{flex: 1}}>
                  <Field
                    component={CustomInput}
                    name="email"
                    placeholder="Email Address"
                  />

                  <Field component={CustomInput} name="bvn" placeholder="BVN" />
                </View>

                <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Continue</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>

        {showAcceptModal && (
          <AcceptModal
            onRequestClose={() => setShowAcceptModal(!showAcceptModal)}
            visible={showAcceptModal}
            navigation={navigation}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#10131B',
    flex: 1,
  },

  customInput: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#212a33',
    backgroundColor: '#2b283550',
    backgroundColor: 'transparent',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: COLORS.white,
  },

  boldText: {
    fontSize: 14,
    lineHeight: 23,
    color: '#2A286A',
    fontFamily: 'CircularStd',
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

  button: {
    width: '100%',
    backgroundColor: '#212a33',
    padding: 23,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    elevation: 2,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
    color: '#536470',
    textTransform: 'capitalize',
  },
});
