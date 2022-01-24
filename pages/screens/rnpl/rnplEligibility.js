import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../../util';

const salaryData = [
  'Earn a minimum monthly income of ₦80,000',
  'Have received salary for at least 6 months',
  'Have no bad loans and a clean credit history',
  `Have the necessary documents like your employment\nletter and staff ID`,
  'Be a Lagos resident',
];

const businessData = [
  'Generate a minimum monthly revenue of\n₦200,000.',
  'Have no bad loans and a clean credit history',
  'Have been in business for at least 1 year',
  'Be able to provide a guarantor',
  'Be a Lagos resident',
];

export default function RnplEligibility({navigation}) {
  return (
    <View style={[styles.container]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{paddingVertical: 20, paddingHorizontal: 10}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <View style={[styles.content]}>
          <Text style={[styles.heading]}>Eligibility</Text>
          <View>
            <Image
              source={images.eligibilityImage}
              style={{
                width: '100%',
                height: 170,
                resizeMode: 'contain',
                marginTop: 30,
              }}
            />
          </View>
          <View style={[styles.textContent]}>
            <Text style={[styles.redText]}>To Be Eligible, You Must</Text>
            <View style={[styles.listText]}>
              {salaryData.map((text, index) => (
                <View style={[styles.list]} key={index}>
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 5,
                      backgroundColor: COLORS.primary,
                      marginRight: 10,
                      marginTop: 2,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: COLORS.primary,
                      lineHeight: 20,
                    }}>
                    {text}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.btnContainer]}>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: COLORS.white}]}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text style={[styles.btnText]}>Not Interested </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: COLORS.secondary}]}
          onPress={() => {
            navigation.navigate('CreditOnboard');
          }}>
          <Text style={[styles.btnText, {color: COLORS.white}]}>Proceed </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 80,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  textContent: {
    marginTop: 10,
    backgroundColor: COLORS.white,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 40,
    borderRadius: 5,
  },
  redText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'red',
    opacity: 0.5,
    alignItems: 'center',
    textAlign: 'center',
  },
  listText: {
    marginTop: 20,
    paddingLeft: 20,
  },

  list: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F7F8FD',
  },

  btn: {
    width: '49%',
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 10,
  },

  btnText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 10,
  },
});
