import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {COLORS, FONTS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

export default EmergencyFundOnboarding = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          padding: 20,
        }}
        onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back-outline"
          size={25}
          style={{
            fontWeight: '900',
          }}
          color={COLORS.light}
        />
      </TouchableOpacity>
      <ScrollView>
        <Image source={images.maskGroup31} style={styles.image} />
        <View style={{paddingHorizontal: 20}}>
          <View style={styles.textWrapper}>
            <Text style={styles.heading}>Emergency Fund</Text>
            <Text style={styles.content}>
              {/* Be a good saver and access instant loans of up to 40% to the value
              of your rent savings. */}
              Access instant loans to help sort out life’s emergencies without
              compromising your rent. Kwaba has got you covered
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('EmergencyLoanHome')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>GET STARTED</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    // paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    // right: -30,
  },
  textWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFE700',
  },
  content: {
    fontSize: 14,
    color: COLORS.white,
    lineHeight: 25,
    textAlign: 'center',
  },

  button: {
    width: '100%',
    backgroundColor: COLORS.light,
    padding: 23,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
