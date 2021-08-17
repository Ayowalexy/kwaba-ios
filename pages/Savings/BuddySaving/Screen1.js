import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import designs from '../style';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {COLORS} from '../../../util';
import {formatNumber, unFormatNumber} from '../../../util/numberFormatter';
import SelectBuddiesModal from '../../../components/SelectBuddiesModal';

const buddySavingFormSchema = yup.object().shape({
  savingTitle: yup.string().required('Please provide saving title'),
  savingNumberOfBuddies: yup.string().required('Please select saving option'),
  savingTargetAmount: yup.string().required('Please provide saving amount'),
  yesOrNo: yup.string().required('Please pick and option'),
});

export default function Screen1({navigation}) {
  const [showSelectBuddiesModal, setShowSelectBuddiesModal] = useState(false);

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
            }}
            // style={designs.textInput}
            keyboardType={name == 'savingTitle' ? 'default' : 'number-pad'}
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

  const NumberInput = (props) => {
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

  const SelectBuddies = (props) => {
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <TouchableOpacity
          style={[styles.customInput, {padding: 20}]}
          onPress={() => {
            setShowSelectBuddiesModal(true);
          }}>
          {value != '' ? (
            <Text
              style={{
                // fontWeight: 'bold',
                color: COLORS.primary,
              }}>
              {value}
            </Text>
          ) : (
            <Text
              style={{
                // fontWeight: 'bold',
                color: '#BABABA',
              }}>
              How many buddies?
            </Text>
          )}

          <Icon
            name="chevron-down-outline"
            size={20}
            style={{fontWeight: 'bold'}}
            color="#BABABA"
          />
        </TouchableOpacity>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const YesOrNo = (props) => {
    const is_business_registered_list = ['Yes', 'No'];
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];
    return (
      <>
        {is_business_registered_list.map((opt, index) => (
          <TouchableOpacity
            key={index}
            style={[
              designs.buttonStyleA,
              {
                borderColor: value == opt ? COLORS.light : '#ADADAD50',
              },
            ]}
            onPress={() => setFieldValue('yesOrNo', opt)}>
            <View>
              <Text
                style={[
                  designs.btnText,
                  {
                    color: value == opt ? COLORS.light : COLORS.grey,
                    fontWeight: value == opt ? 'bold' : 'normal',
                  },
                ]}>
                {opt}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const handleSubmit = async (values) => {
    // console.log(values);
    const data = {
      title: values.savingTitle,
      number_of_buddies: values.savingNumberOfBuddies[0],
      target_amount: unFormatNumber(values.savingTargetAmount),
    };

    navigation.navigate('BuddySaving2', data);
  };

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
        <View style={designs.header}>
          <Text
            style={{
              color: '#00DC99',
              fontSize: 16,
              fontFamily: 'CircularStd',
              fontWeight: 'bold',
              lineHeight: 20,
            }}>
            Buddy Saving
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 10,
              fontFamily: 'CircularStd',
              fontWeight: '600',
              lineHeight: 13,
              marginTop: 1,
            }}>
            Save towards your next rent alone
          </Text>
        </View>

        <Formik
          validationSchema={buddySavingFormSchema}
          initialValues={{
            savingTitle: '',
            savingNumberOfBuddies: '',
            savingTargetAmount: '',
            yesOrNo: '',

            // savingTitle: 'Savings for I and My Buddies',
            // savingNumberOfBuddies: '',
            // savingTargetAmount: '100000',
            // yesOrNo: 'No',
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}>
          {({handleSubmit, isValid, values, setValues}) => (
            <>
              <>
                <Text style={[designs.boldText, {marginTop: 20}]}>
                  Give your buddy saving a title
                </Text>
                <Field
                  component={CustomInput}
                  name="savingTitle"
                  placeholder="Savings Title"
                />
              </>

              <>
                <Text style={[designs.boldText, {marginTop: 20}]}>
                  How many buddies will you be saving with?
                </Text>
                <Field
                  component={SelectBuddies}
                  name="savingNumberOfBuddies"
                  // placeholder="Enter number"
                />
              </>

              <>
                <Text style={[designs.boldText, {marginTop: 20}]}>
                  Do you and your buddies have a target{'\n'}amount?
                </Text>
                <Field
                  component={YesOrNo}
                  name="yesOrNo"
                  // placeholder="Enter amount"
                />
              </>

              {values.yesOrNo.toLocaleLowerCase() == 'yes' && (
                <>
                  <Text style={[designs.boldText, {marginTop: 20}]}>
                    What is the target amount?
                  </Text>
                  <Field
                    component={NumberInput}
                    name="savingTargetAmount"
                    placeholder="Enter amount"
                  />
                </>
              )}

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isValid ? false : true}
                style={[
                  designs.button,
                  {
                    backgroundColor: isValid ? '#00DC99' : '#00DC9950',
                  },
                ]}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    fontSize: 14,
                    lineHeight: 30,
                  }}>
                  Next
                </Text>
              </TouchableOpacity>

              <SelectBuddiesModal
                onRequestClose={() =>
                  setShowSelectBuddiesModal(!showSelectBuddiesModal)
                }
                visible={showSelectBuddiesModal}
                onClick={(value) => {
                  setValues({...values, savingNumberOfBuddies: value});
                }}
                // selectedMonth={selectedMonth}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

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
    marginTop: 8,
    fontSize: 14,
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
