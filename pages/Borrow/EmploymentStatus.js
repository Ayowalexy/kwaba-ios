import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

const status = [
  {
    title: 'Salary Earner',
    body: 'Access instant loans to top up your rent if you are falling short',
    img: '',
  },
  {
    title: 'Business Owner',
    body: 'Access instant loans to top up your rent if you are falling short',
    img: '',
  },
];

const EmploymentStatus = ({navigation}) => {
  return (
    <View style={styles.container}>
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
              onPress={() => navigation.navigate('RentalLoanForm1')}
              key={index}
              disabled={index == 1 ? true : false}
              style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardBody}>{body}</Text>
              </View>
              <View style={styles.cardImageContainer}>
                {/* img goes here */}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 15,
    paddingVertical: 20,
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
    elevation: 1,
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
    width: 60,
    height: 60,
    backgroundColor: '#46596920',
    borderRadius: 30,
  },
});

export default EmploymentStatus;
