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
import {COLORS, images} from '../../../util';

export default function CreditScoreForAccountOnboarding({navigation}) {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#F7F8FD'} />
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
          }}>
          <Icon
            name="chevron-back"
            // color={COLORS.white}
            color={COLORS.dark}
            size={20}
            onPress={() => navigation.goBack()}
          />
          {/* <Icon name="ellipsis-vertical" color={COLORS.white} size={20} /> */}
        </View>

        <View style={[styles.content]}>
          <Image source={images.progress} style={styles.image} />

          <View style={styles.textWrapper}>
            <Text style={styles.title}>View Your Credit Report</Text>
            <Text style={styles.subText}>
              Connect your Bank Verification Number (BVN) to be able to view
              your credit report.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CreditScoreCheckFormForAccount')
            }>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
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
    backgroundColor: COLORS.white,
    backgroundColor: '#F7F8FD',
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
    // opacity: 0.5,
  },
  textWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.secondary,
    // color: '#a5c2d1',
  },
  subText: {
    fontSize: 14,
    color: COLORS.dark,
    // color: '#a5c2d180',
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },

  button: {
    width: '100%',
    backgroundColor: '#212a33',
    backgroundColor: COLORS.secondary,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    // elevation: 2,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
    // color: '#536470',
    textTransform: 'uppercase',
  },
});
