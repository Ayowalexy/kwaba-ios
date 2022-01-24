import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CreditForm} from '.';
import {COLORS, images} from '../../../../util';

export default function CreditOnboard({navigation}) {
  const [showCreditForm, setShowCreditForm] = useState(false);
  return (
    <>
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
          }}>
          <Icon
            name="chevron-back"
            color={COLORS.dark}
            size={25}
            onPress={() => navigation.navigate('Home')}
          />
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

          <TouchableOpacity onPress={() => setShowCreditForm(true)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Check credit report</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {showCreditForm && (
        <CreditForm
          visible={showCreditForm}
          onRequestClose={() => setShowCreditForm(!showCreditForm)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F8FD',
    flex: 1,
  },
  content: {
    paddingHorizontal: 30,
    flex: 1,
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  textWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subText: {
    fontSize: 14,
    color: COLORS.dark,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },

  button: {
    width: '100%',
    backgroundColor: '#212a33',
    backgroundColor: COLORS.primary,
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
    textTransform: 'capitalize',
  },
});
