import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {COLORS} from '../../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAllEmergencyLoansRepayment} from '../../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import {formatNumber} from '../../../util/numberFormatter';
import moment from 'moment';

export default function Transactions(props) {
  const {visible, onRequestClose} = props;
  const [spinner, setSpinner] = useState(false);
  const [repayments, setRepayments] = useState([]);

  const top = useSafeAreaInsets().top;
  const getAllLoans = async () => {
    setSpinner(true);
    const response = await getAllEmergencyLoansRepayment();
    // console.log('All Loans Response: ', response);

    try {
      if (response.status == 200) {
        setSpinner(false);
        setRepayments(response?.data?.data);
      } else {
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      console.log('All Loans Error: ', error.response);
    }
  };

  useEffect(() => {
    getAllLoans();
  }, []);
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="slide"
      transparent={true}>
      <View style={[styles.centeredModalWrapper, { marginTop: Platform.OS == 'ios' ? top : 0}]}>
        <View style={[styles.bg]}>
          <View style={[styles.headline]}>
            <Icon
              style={{
                color: COLORS.white,
                marginTop: 2,
              }}
              onPress={() => onRequestClose()}
              name="arrow-back"
              size={20}
              color={COLORS.white}
            />
            <Text
              style={{
                color: COLORS.white,
                fontWeight: 'normal',
                marginLeft: 20,
              }}>
              Repayment History
            </Text>
          </View>

          {repayments?.length <= 0 ? (
            <View style={[styles.transactionBody]}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: COLORS.dark,
                  textAlign: 'center',
                  marginBottom: 20,
                }}>
                No transactions yet
              </Text>
              {spinner && (
                <ActivityIndicator size={'small'} color={COLORS.primary} />
              )}
            </View>
          ) : (
            <ScrollView
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              {repayments
                ?.reverse()
                ?.slice(0, 20)
                ?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        paddingHorizontal: 30,
                        paddingVertical: 15,
                        borderBottomColor: '#BFBFBF50',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          backgroundColor: '#2A286A20',
                          borderRadius: 5,
                          marginRight: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name="checkmark-done-sharp"
                          size={15}
                          color={COLORS.dark}
                        />
                      </View>
                      <View style={{flex: 1}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: COLORS.dark,
                              textTransform: 'capitalize',
                            }}>
                            {item.reason || 'No description for this loan'}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: COLORS.dark,
                            }}>
                            ₦{formatNumber(item.amount) || '0.00'}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 10,
                            color: COLORS.dark,
                            marginTop: 5,
                          }}>
                          {moment(item.created_at).format('Do MMMM YYYY')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          )}
        </View>
      </View>

      {/* <Spinner visible={spinner} size="large" /> */}
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredModalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bg: {
    width: '100%',
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headline: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,

    // No transaction style
    justifyContent: 'center',
    alignItems: 'center',
  },
});
