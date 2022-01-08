import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../util';

export default function CreditScoreOnboarding({navigation}) {
  return (
    <>
      <StatusBar backgroundColor={'#10131B'} />

      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderBottomColor: '#2b273550',
            borderBottomWidth: 1,
          }}>
          <Icon
            name="chevron-back"
            color={COLORS.white}
            size={20}
            onPress={() => navigation.navigate('Home')}
          />
          {/* <Icon name="ellipsis-vertical" color={COLORS.white} size={20} /> */}
        </View>

        <View style={[styles.content]}>
          <Image source={images.speedometer} style={styles.image} />

          <View style={styles.textWrapper}>
            <Text style={styles.title}>Check Your Credit Report</Text>
            <Text style={styles.subText}>
              To successfully apply to rent now-pay later, we need to check your
              credit report to get to know you a little bit more.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('CreditScoreForm')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Check credit report</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    backgroundColor: '#10131B',
    flex: 1,
  },
  content: {
    paddingHorizontal: 30,
    flex: 1,
    marginTop: 20,
    // justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    opacity: 0.5,
  },
  textWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.light,
    color: '#a5c2d1',
  },
  subText: {
    fontSize: 14,
    color: COLORS.white,
    color: '#a5c2d180',
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },

  button: {
    width: '100%',
    backgroundColor: '#212a33',
    padding: 23,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    elevation: 2,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
    color: '#536470',
    textTransform: 'capitalize',
  },
});
