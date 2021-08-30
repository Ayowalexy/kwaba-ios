import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS} from '../util';
import {getMaxLoanCap} from '../redux/actions/savingsActions';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {formatNumber} from '../util/numberFormatter';
import {useDispatch, useSelector} from 'react-redux';

export default function AddFundsToSavingsModal(props) {
  const dispatch = useDispatch();
  const allSavings = useSelector((state) => state.getSoloSavingsReducer);
  // const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);

  useEffect(() => {
    dispatch(getMaxLoanCap());
  }, []);

  const {onRequestClose, visible, onClick} = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.dark,
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
            Where do you want to save?
          </Text>
          <View style={[styles.cardContainer]}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 80,
              }}
              scrollEnabled
              showsVerticalScrollIndicator={false}>
              {visible &&
                allSavings?.data.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[styles.card]}
                      onPress={() => onClick(item.id)}>
                      <View style={[styles.cardFlex]}>
                        <View style={[styles.progressContainer]}>
                          <AnimatedCircularProgress
                            size={60}
                            width={5}
                            rotation={0}
                            style={{zIndex: 9, position: 'relative'}}
                            fill={
                              (Number(item.amount_save) /
                                Number(item.target_amount)) *
                              100
                            }
                            tintColor={COLORS.light}
                            backgroundColor="#2A286A10">
                            {(fill) => (
                              <View
                                style={{
                                  backgroundColor: COLORS.white,
                                  height: 40,
                                  width: 40,
                                  borderRadius: 50,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  // elevation: 2,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'CircularStd',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: COLORS.dark,
                                    textAlign: 'center',
                                  }}>
                                  {fill.toFixed(0)}%
                                </Text>
                              </View>
                            )}
                          </AnimatedCircularProgress>
                        </View>
                        <View style={[styles.cardText]}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={[styles.cardTitle]}>{item.name}</Text>
                          </View>

                          <View style={[styles.cardAmount]}>
                            <Text style={[styles.amountText]}>
                              ₦{formatNumber(item.amount_save) || '0.00'}
                            </Text>
                            <Text style={[styles.amountText, {opacity: 0.5}]}>
                              ₦{formatNumber(item.target_amount)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'CircularStd',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden',
    paddingVertical: 25,
  },

  cardContainer: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    width: '100%',
    flex: 1,
  },
  card: {
    width: '100%',
    backgroundColor: '#9D98EC20',
    borderRadius: 15,
    marginBottom: 0,
    marginTop: 10,
  },
  cardFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginRight: 20,
  },
  cardText: {
    // borderWidth: 1,
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: COLORS.dark,
    marginRight: 20,
  },
  cardAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  amountText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: COLORS.dark,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
