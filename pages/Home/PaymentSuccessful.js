import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons, images} from '../../util';
import {
  getMaxLoanCap,
  getTotalSoloSavings,
  getOneSoloSavings,
  getOneSoloSavingsTransaction,
} from '../../redux/actions/savingsActions';
import {getAirtimeBillTrans} from '../../redux/actions/billsAction';
import {useDispatch, useSelector} from 'react-redux';

export default function PaymentSuccessful(props) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.getSoloSavingsReducer);
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  useEffect(() => {
    const backAction = () => {
      //   Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      //     {
      //       text: 'Cancel',
      //       onPress: () => null,
      //       style: 'cancel',
      //     },
      //     {text: 'YES', onPress: () => BackHandler.exitApp()},
      //   ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    dispatch(getTotalSoloSavings());
    dispatch(getMaxLoanCap());
    dispatch(getOneSoloSavings(props?.route?.params?.id));
    dispatch(getOneSoloSavingsTransaction(props?.route?.params?.id));
    dispatch(getAirtimeBillTrans());
  }, []);

  const handlePress = () => {
    dispatch(getTotalSoloSavings());
    dispatch(getMaxLoanCap());
    dispatch(getOneSoloSavings(props?.route?.params?.id));
    dispatch(getOneSoloSavingsTransaction(props?.route?.params?.id));
    dispatch(getAirtimeBillTrans());

    console.log('Payment ID: ', props?.route?.params?.id);

    if (props?.route?.params?.name) {
      props.navigation.navigate(props?.route?.params?.name, {
        id: props?.route?.params?.id,
      });
    } else {
      //   props.navigation.goBack();
      props.navigation.navigate('Home');
    }
  };

  return (
    <View style={[styles.content]}>
      <Icon
        onPress={handlePress}
        name="arrow-back-outline"
        size={25}
        style={{padding: 18, paddingHorizontal: 10}}
        color="#2A286A"
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 200, height: 200}}
          source={images.congratulation}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.primary}}>
          {props?.route?.params?.content || 'Payment Successful'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },

  btn: {
    width: '100%',
    // height: 70,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    elevation: 1,
    paddingVertical: 15,
  },
});
