import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import {COLORS} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import JoinChallengeModal from './JoinChallengeModal';

const data = [
  {
    name: 'Double December 25k Challenge',
    description:
      'Challenge other renters to save 25k in the month of December and get double interest for the month',
    img: require('../../assets/images/target3.png'),
    startDate: 'December 1st',
    endDate: 'December 31st',
    target: '25000',
    interestRate: '',
    id: 1,
  },
  {
    name: 'Double December 50k Challenge',
    description:
      'Challenge other renters to save 50k in the month of December and get double interest for the month',
    img: require('../../assets/images/target2.png'),
    startDate: 'December 1st',
    endDate: 'December 31st',
    target: '50000',
    interestRate: '',
    id: 2,
  },
  {
    name: 'Double December 100k Challenge',
    description:
      'Challenge other renters to save 100k in the month of December and get double interest for the month',
    img: require('../../assets/images/target.png'),
    startDate: 'December 1st',
    endDate: 'December 31st',
    target: '100000',
    interestRate: '',
    id: 3,
  },
];

const img = require('../../assets/images/high-five.png');
const snowflake = require('../../assets/images/snowflake.png');
const snow = require('../../assets/images/snow.png');

export default function JoinChallengeList({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const renderItem = ({item, index}) => {
    const {name, description, img} = item;
    return (
      <TouchableOpacity onPress={() => setShowModal(true)} style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardBody}>{description}</Text>
        </View>
        <View style={styles.cardImageContainer}>
          <Image
            source={img}
            style={{
              height: 60,
            }}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.targetText,
              {
                color:
                  index == 0
                    ? COLORS.black
                    : index == 1
                    ? COLORS.red
                    : '#5A4CB1',
              },
            ]}>
            ₦{index == 0 ? '25,000' : index == 1 ? '50,000' : '100,000'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={[styles.container]}>
        <StatusBar backgroundColor={'#5A4CB1'} />
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={25}
          style={{fontWeight: '900'}}
          color={COLORS.white}
        />
        <Image
        source={snowflake}
        style={{
          width: 100,
          height: 100,
          position: 'absolute',
          right: 10,
          top: 10,
          opacity: 0.2,
          zIndex: 0
        }}
        resizeMode="contain"
      />
       <Image
        source={snow}
        style={{
          width: 100,
          height: 100,
          position: 'absolute',
          left: 0,
          bottom: 10,
          opacity: 0.2,
          zIndex: 0
        }}
        resizeMode="contain"
      />
      <Image
        source={snow}
        style={{
          width: 50,
          height: 50,
          position: 'absolute',
          right: 0,
          bottom: 10,
          opacity: 0.2,
          zIndex: 0
        }}
        resizeMode="contain"
      />
        <View style={{marginTop: 10, marginBottom: 20, paddingLeft: 5}}>
          <Text style={styles.heading}>Join a Savings Challenge</Text>
        </View>

        <View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      {showModal && (
        <JoinChallengeModal
          onRequestClose={() => setShowModal(!showModal)}
          visible={showModal}
          navigation={navigation}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#5A4CB1',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  card: {
    padding: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5A4CB1',
    color: '#444',
    lineHeight: 20,
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.dark,
    color: '#555',
  },
  cardImageContainer: {
    width: 90,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#EEE',
    paddingLeft: 20,
  },
  targetText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.black,
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
});
