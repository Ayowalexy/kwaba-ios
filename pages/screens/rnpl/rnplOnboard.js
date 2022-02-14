import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {COLORS, FONTS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  getTotalSoloSavings,
  getMaxLoanCap,
} from '../../../redux/actions/savingsActions';

export default function RnplOnboard({navigation}) {
  const dispatch = useDispatch();
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    dispatch(getTotalSoloSavings());
    dispatch(getMaxLoanCap());

    const data = getMaxLoanCap1?.data;
    setSavings(data?.you_have_save);
  }, []);

  const handleRentalLoanNavigate = async () => {};

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
        <Image source={images.rentNowPayLaterOnboarding} style={styles.image} />
        <View style={{paddingHorizontal: 20}}>
          <View style={styles.textWrapper}>
            <Text style={styles.heading}>Rent Now Pay Later</Text>
            <Text style={styles.content}>
              Whether you are looking to renew your rent or pay for a new place,
              we can pay your bulk rent so you pay back in easy monthly payments
            </Text>
          </View>

          <TouchableOpacity
            // onPress={() => navigation.navigate('RnplEligibility')}
            onPress={() => navigation.navigate('RnplEmploymentStatus')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>GET STARTED</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

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
    color: COLORS.light,
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
