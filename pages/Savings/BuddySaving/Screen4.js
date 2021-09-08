import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../../util';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import SelectBuddyRelationshipModal from '../../../components/SelectBuddyRelationshipModal';

const buddySavingFormSchema = yup.object().shape({
  relationshipWithBuddy: yup
    .string()
    .required('Please select relationship option'),
});

export default function Screen4(props) {
  const {navigation, route} = props;
  const [
    showSelectBuddyRelationshipModal,
    setShowSelectBuddyRelationshipModal,
  ] = useState(false);

  const handleSubmit = (values) => {
    const data = {
      ...route.params,
      buddy_relationship: values.relationshipWithBuddy,
    };

    // console.log('Screen 4: ', data);

    navigation.navigate('BuddySaving5', data);
  };

  const SelectBuddyRelationship = (props) => {
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
            setShowSelectBuddyRelationshipModal(true);
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
              Who are your buddies to you?
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

  return (
    <Formik
      validationSchema={buddySavingFormSchema}
      initialValues={{
        relationshipWithBuddy: '',
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}>
      {({handleSubmit, isValid, values, setValues}) => (
        <>
          <View style={designs.container}>
            <Icon
              onPress={() => navigation.goBack()}
              name="arrow-back-outline"
              size={25}
              style={{fontWeight: '900'}}
              color="#2A286A"
            />
            <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
              <>
                <Text style={[designs.boldText, {marginTop: 20}]}>
                  Relationship with buddies
                </Text>
                <Field
                  component={SelectBuddyRelationship}
                  name="relationshipWithBuddy"
                />
              </>

              <TouchableOpacity
                onPress={handleSubmit}
                // disabled={isValid ? false : true}
                style={[
                  designs.button,
                  {
                    backgroundColor: isValid ? '#00DC99' : '#00DC9950',
                    marginTop: 50,
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
            </ScrollView>
          </View>

          <SelectBuddyRelationshipModal
            onRequestClose={() =>
              setShowSelectBuddyRelationshipModal(
                !showSelectBuddyRelationshipModal,
              )
            }
            visible={showSelectBuddyRelationshipModal}
            onClick={(value) => {
              setValues({...values, relationshipWithBuddy: value});
            }}
          />
        </>
      )}
    </Formik>
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
