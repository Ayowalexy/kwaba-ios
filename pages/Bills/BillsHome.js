import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, images, icons} from '../../util/index';
import {useDispatch, useSelector} from 'react-redux';

const BillsHome = ({navigation}) => {
  const dispatch = useDispatch();
  const getBills = useSelector((state) => state.getBillServicesReducer);

  console.log("getBills", getBills)

  // DATA
  const billsHomeCarddata = [
    {
      image: icons.electricity,
      cardTitle: 'Electricity',
      cardSubTitle: 'Pay for your electricity easily',
    },
    {
      image: icons.cabletv,
      cardTitle: 'Cable TV',
      cardSubTitle: 'Keep the show on, pay easily',
    },
    {
      image: icons.internetsub,
      cardTitle: 'Internet subscription',
      cardSubTitle: 'Pay your internet subscription',
    },
    {
      image: icons.waste,
      cardTitle: 'Waste',
      cardSubTitle: 'Sort out your waste bill',
    },
    {
      image: icons.water,
      cardTitle: 'Water',
      cardSubTitle: 'Keep water flowing, pay easily',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={25}
          style={{fontWeight: '900'}}
          color={COLORS.light}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column', paddingLeft: 10}}>
            <Text style={styles.headerMainText}>Pay bills</Text>
            <Text style={styles.headertext}>
              Take care of all your essential bills
            </Text>
          </View>

          <Image source={images.billheaderimage} style={styles.headerImage} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled
        style={{
          flex: 1,
          flexDirection: 'column',
          alignSelf: 'center',
          borderRadius: 10,
          width: '100%',
          paddingHorizontal: 20,
          marginTop: 20,
        }}>
        {getBills?.data?.map((value, index) => {
          return (
            <TouchableOpacity
              disabled={
                value.identifier != 'airtime' &&
                value.identifier != 'data' &&
                value.identifier != 'tv-subscription' &&
                value.identifier != 'electricity-bill'
              }
              // activeOpacity={value.identifier == 'education' ? 0.2 : 1}
              style={{
                backgroundColor: COLORS.white,
                flexDirection: 'row',
                marginBottom: 10,
                borderRadius: 10,
                justifyContent: 'space-between',
                paddingVertical: 15,
                paddingHorizontal: 15,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#EAEAEA',
                opacity:
                  value.identifier != 'airtime' &&
                  value.identifier != 'data' &&
                  value.identifier != 'tv-subscription' &&
                  value.identifier != 'electricity-bill'
                    ? 0.5
                    : 1,
              }}
              key={index}
              onPress={() => {
                value.identifier == 'airtime'
                  ? navigation.navigate('AirtimeHome')
                  : value.identifier == 'data'
                  ? navigation.navigate('DataBill', {name: value.name})
                  : value.identifier == 'tv-subscription'
                  ? navigation.navigate('CableTvBill', {name: value.name})
                  : navigation.navigate('ElectricityBill', {name: value.name});
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: '#9D98EC50',
                    width: 40,
                    height: 40,
                    marginRight: 20,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name={
                      value.identifier == 'tv-subscription'
                        ? 'tv-sharp'
                        : value.identifier == 'electricity-bill'
                        ? 'pulse'
                        : value.identifier == 'data'
                        ? 'radio'
                        : value.identifier == 'airtime'
                        ? 'phone-portrait'
                        : value.identifier == 'education'
                        ? 'school'
                        : value.identifier == 'events'
                        ? 'restaurant'
                        : value.identifier == 'insurance'
                        ? 'ribbon'
                        : 'apps'
                    }
                    size={25}
                    color={COLORS.primary}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={[
                      FONTS.h3FontStyling,
                      {color: COLORS.primary, fontWeight: 'bold', fontSize: 16},
                    ]}>
                    {value.name}
                  </Text>
                  <Text
                    style={[
                      FONTS.body4FontStyling,
                      {color: '#ADADAD', fontSize: 12},
                    ]}>
                    Pay for {value.name}
                  </Text>
                </View>
              </View>

              <View>
                <Icon
                  name="arrow-forward-outline"
                  size={25}
                  style={{
                    fontWeight: '900',
                    fontSize: 18,
                  }}
                  color={COLORS.primary}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default BillsHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  // marginTop: -55,
  // marginLeft: 30,
  header: {
    // flex: 1,
    flexDirection: 'column',
    // maxHeight: 178,
    backgroundColor: '#2A286A',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    padding: 20,
    paddingBottom: 40,
    overflow: 'hidden',
    // paddingLeft: 20,
    // paddingTop: 20,
  },
  headerMainText: {
    // marginLeft: 16,
    color: COLORS.yellow,
    fontFamily: 'CircularStd',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  headertext: {
    width: '70%',
    color: COLORS.white,
    fontFamily: 'CircularStd-bold,Book',
    // textAlign: '',
    lineHeight: 20,
    // marginLeft: 16,
  },
  headerImage: {
    position: 'absolute',
    right: -30,
    bottom: -40,
    flex: 1,
    height: 150,
    width: 200,
    resizeMode: 'contain',
    // backgroundColor: 'red',
  },
});
