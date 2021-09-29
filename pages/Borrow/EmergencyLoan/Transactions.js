import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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

  const getAllLoans = async () => {
    setSpinner(true);
    try {
      const response = await getAllEmergencyLoansRepayment();
      // console.log('All Loans Response: ', response);
      if (response.status == 200) {
        setSpinner(false);
        setRepayments(response.data.repayments);
      } else {
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      console.log('All Loans Error: ', error);
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
      <View style={styles.centeredModalWrapper}>
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
                }}>
                No transactions yet
              </Text>
            </View>
          ) : (
            <ScrollView
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              {repayments?.map((item, index) => {
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
                        width: 50,
                        height: 50,
                        backgroundColor: '#2A286A20',
                        borderRadius: 10,
                        marginRight: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon name="alarm" size={20} color={COLORS.dark} />
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
                          }}>
                          {item.loan_purpose}
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

      <Spinner visible={spinner} size="large" />
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
