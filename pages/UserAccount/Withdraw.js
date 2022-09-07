import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {COLORS} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
import {getMaxLoanCap} from '../../redux/actions/savingsActions';

import WithdrawalForm from './Withdrawal/WithdrawalForm';
import WithdrawalStart from './Withdrawal/WithdrawalStart';

export default function Withdraw({navigation}) {
  const dispatch = useDispatch();
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  useEffect(() => {
    dispatch(getMaxLoanCap());
  }, []);

  return (
    <>
      <View style={[styles.container, { marginTop: Platform.OS == 'ios' ? statusBarHeight : 0}]}>
        <Icon
          onPress={() => {
            navigation.goBack();
            dispatch(getMaxLoanCap());
          }}
          name="arrow-back-outline"
          size={25}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 15,
          }}
          color={COLORS.primary}
        />
        <Text style={[styles.heading]}>Withdraw</Text>

        {getMaxLoanCap1?.data?.you_have_save <= 0 ? (
          <WithdrawalStart navigation={navigation} />
        ) : (
          <WithdrawalForm navigation={navigation} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  heading: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
