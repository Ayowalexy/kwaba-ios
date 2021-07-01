import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ComingSoon from '../../components/ComingSoon';

const status = [
  {
    title: 'Salary Earner',
    body:
      'Select if you are employed by a private company, government agency or NGO',
    img: require('../../assets/images/rent_now_pay_later_img_2.png'),
  },
  {
    title: 'Business Owner',
    body:
      'Select if your are an entrepreneur running a business offline or online',
    img: require('../../assets/images/rent_now_pay_later_img_1.png'),
  },
];

const EmploymentStatus = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#f2f2f2" /> */}
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900'}}
        color={COLORS.primary}
      />
      <ScrollView style={{paddingTop: 10}}>
        <View>
          <Text style={styles.heading}>What's your employment status?</Text>
        </View>

        <View>
          {status.map(({title, body, img}, index) => (
            <TouchableOpacity
              onPress={() =>
                index == 0
                  ? navigation.navigate('EligibilitySalaryEarner')
                  : navigation.navigate('EligibilityBusinessOwner')
              }
              key={index}
              // disabled={index == 1 ? true : false}
              style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardBody}>{body}</Text>
              </View>
              <View style={styles.cardImageContainer}>
                {/* img goes here */}
                <Image
                  source={img}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ComingSoon
        onRequestClose={() => setShowModal(!showModal)}
        visible={showModal}
        name="business"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 15,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  card: {
    padding: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 0.5,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
    opacity: 0.8,
  },
  cardBody: {
    fontSize: 12,
    lineHeight: 20,
    color: '#ADADAD',
  },
  cardImageContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#46596920',
    borderRadius: 100,
  },
});

export default EmploymentStatus;
