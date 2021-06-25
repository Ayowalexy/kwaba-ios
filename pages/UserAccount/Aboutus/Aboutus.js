import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

import {
  COLORS,
  FONTS,
  images,
  SIZES,
  icons,
  designs,
} from '../../../util/index';

const Aboutus = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{
          // marginTop: 28,
          marginLeft: 16,
          fontWeight: '900',
          paddingVertical: 20,
        }}
        color="#2A286A"
      />
      <ScrollView>
        <Text
          style={[
            FONTS.h1FontStyling,
            {
              color: '#2A286A',
              textAlign: 'left',
              fontWeight: 'bold',
              marginBottom: 15,
              marginLeft: 16,
            },
          ]}>
          About us
        </Text>
        <View style={styles.aboutussection}>
          <Text style={styles.aboutusText}>
            We're a team of believers building out the future of rent. We are
            reimagining the interaction between rent and a renter's lifestyle.
            Our innovative products are taking us ever closer to achieving our
            vision. While on our journey, we are helping renters improve their
            financial health, capacity and giving them more control over their
            rent.
          </Text>
          <Text style={styles.contactusText}>Contact us</Text>
          <Text style={styles.aboutusMinorText}>
            131A Eti-Osa way, Dolphin Estate, Ikoyi, Lagos - Nigeria
          </Text>
          <View style={styles.iconsSection}>
            <Image
              source={icons.instagram}
              style={{height: 24, width: 24, marginRight: 20}}
            />
            <Image
              source={icons.facebook}
              style={{height: 24, width: 24, marginRight: 20}}
            />
            <Image
              source={icons.whatsapp}
              style={{height: 24, width: 24, marginRight: 20}}
            />
            <Image
              source={icons.linkedin}
              style={{height: 24, width: 24, marginRight: 20}}
            />
            <Image
              source={icons.telegram}
              style={{height: 24, width: 24, marginRight: 20}}
            />
          </View>
          <Text style={styles.aboutusMinorText}>
            Email : <Text>hello@kwaba.ng</Text>
          </Text>
          <Text style={styles.aboutusMinorText}>
            Website : <Text>www.kwaba.ng</Text>
          </Text>
          <Image
            style={[
              {
                marginTop: 0,
                width: 130,
                height: 50,
                // marginLeft: 16,
                marginTop: 89,
                resizeMode: 'contain',
              },
            ]}
            source={images.companyLogo}
          />
          <Text
            style={[
              styles.aboutusMinorText,
              {color: COLORS.grey, fontSize: 12},
            ]}>
            Copyright 2021. All Rights Reserved {'\n'}App Version 0.1
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Aboutus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  aboutussection: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    margin: 10,
    flexDirection: 'column',
    padding: 20,
  },
  aboutusText: {
    fontFamily: 'Circular Std',
    fontSize: 14,
    color: COLORS.dark,
    fontWeight: '500',
    lineHeight: 30,
  },
  aboutusMinorText: {
    fontFamily: 'Circular Std',
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.dark,
    marginTop: 10,
    // borderWidth: 1,
  },
  contactusText: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 20,
    // lineHeight: 32,
    color: '#2A286A',
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 20,
    // borderWidth: 1,
    // marginBottom: 20,
  },
  iconsSection: {
    marginTop: 20,
    // marginBottom: 20,
    flexDirection: 'row',
    height: 25,
    // justifyContent: 'space-evenly',
  },
});
