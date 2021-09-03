import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import {getSingleLoan} from '../../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import {formatNumber} from '../../../util/numberFormatter';

export default function ActiveLoanModal(props) {
  const {visible, onRequestClose, loanID, loanData} = props;
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    console.log('Loan Data: ', loanData);
    getOne();
  }, []);

  const getOne = async () => {
    const data = {
      loanId: loanID,
    };
    try {
      const resp = await getSingleLoan(data);
      if (resp.status == 200) {
        console.log('response get one loan: ', resp.data.data);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <>
      <StatusBar
        animated={true}
        // backgroundColor={loanData.status == 1 ? COLORS.primary : COLORS.orange}
        backgroundColor={COLORS.primary}
        barStyle="default"
      />
      <Modal
        visible={visible}
        onRequestClose={onRequestClose}
        animationType="fade"
        transparent={true}>
        <View style={styles.centeredModalWrapper}>
          <View style={[styles.bg]}>
            <View
              style={{
                // backgroundColor:
                //   loanData.status == 1 ? COLORS.primary : COLORS.orange,
                backgroundColor: COLORS.primary,
                width: '100%',
                height: 100,
              }}
            />
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: -50,
              }}>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  width: '100%',
                  minHeight: 50,
                  elevation: 1,
                  // padding: 20,
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'normal',
                        color: COLORS.dark,
                      }}>
                      Repayment Amount:
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginTop: 5,
                        marginLeft: 2,
                        color: COLORS.dark,
                      }}>
                      ₦{formatNumber(20000)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      // backgroundColor:
                      //   loanData.status == 1 ? COLORS.primary : COLORS.orange,
                      // padding: 20,
                      backgroundColor: COLORS.primary,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontWeight: 'bold',
                        fontSize: 10,
                        fontStyle: 'italic',
                      }}>
                      {loanData.status == 1 ? 'PAY NOW' : 'PENDING'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  // minHeight: 200,
                  // flex: 1,
                  backgroundColor: COLORS.white,
                  marginTop: 10,
                  borderRadius: 5,
                  // elevation: 100,
                  elevation: 1,
                }}>
                <View style={[styles.table]}>
                  <Text style={[styles.tableLabel]}>Account Name</Text>
                  <Text style={[styles.tableValue]}>JOSHUA UDO NWOSU</Text>
                </View>
                <View style={[styles.table]}>
                  <Text style={[styles.tableLabel]}>Account Number</Text>
                  <Text style={[styles.tableValue]}>0094552107</Text>
                </View>
                <View style={[styles.table]}>
                  <Text style={[styles.tableLabel]}>Bank</Text>
                  <Text style={[styles.tableValue]}>Access Bank(Diamond)</Text>
                </View>
                <View style={[styles.table]}>
                  <Text style={[styles.tableLabel]}>Status</Text>
                  <Text
                    style={[
                      styles.tableValue,
                      {fontStyle: 'italic', fontWeight: 'bold'},
                    ]}>
                    {loanData.status == 1 ? 'PAID' : 'PENDING'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Spinner visible={spinner} size="large" />
    </>
  );
}

const styles = StyleSheet.create({
  centeredModalWrapper: {
    flex: 1,
    justifyContent: 'center',
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

  table: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#BFBFBF50',
  },
  tableLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  tableValue: {
    fontSize: 10,
    fontWeight: 'normal',
    color: COLORS.dark,
  },
});
