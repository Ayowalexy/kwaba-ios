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
            The easy way to save and pay for your rent. Kwaba helps you save
            towards your rent, get rent top-ups and instant loans. Kwaba has
            your privacy at heart. Our platform was built with Bank-grade
            security features. We work with PCIDSS compliant payment processors
            for the security of your data. Your savings are overseen by our
            partners who are regulated at the highest standard of compliance
            hence your funds are safe.
          </Text>
          <Text style={styles.contactusText}>Contact us</Text>
          <Text style={styles.aboutusMinorText}>
            131A Eti-Osa way, Dolphin Estate, Ikoyi, Lagos - Nigeria
          </Text>
          <Text style={styles.aboutusMinorText}>hello@kwaba.ng</Text>
          <View style={styles.iconsSection}>
            <Image source={icons.instagram} style={{height: 24, width: 24}} />
            <Image source={icons.facebook} style={{height: 24, width: 24}} />
            <Image source={icons.whatsapp} style={{height: 24, width: 24}} />
            <Image source={icons.linkedin} style={{height: 24, width: 24}} />
            <Image source={icons.telegram} style={{height: 24, width: 24}} />
          </View>
          <Text style={styles.aboutusMinorText}>www.kwaba.ng</Text>
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
    marginTop: 20,
  },
  contactusText: {
    fontFamily: 'CircularStd-Bold',
    fontSize: SIZES.h1,
    lineHeight: 32,
    color: '#2A286A',
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  iconsSection: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    height: 25,
    justifyContent: 'space-evenly',
  },
});
