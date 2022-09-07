import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../util';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {formatNumber} from '../../../util/numberFormatter';
import {useDispatch, useSelector} from 'react-redux';
import {getMaxLoanCap} from '../../../redux/actions/savingsActions';

export default function SavingsListModal(props) {
  const dispatch = useDispatch();
  const allSoloSaving = useSelector((state) => state.getSoloSavingsReducer);
  const allBuddySaving = useSelector((state) => state.getBuddySavingsReducer);

  const {onRequestClose, visible, type, navigation, selectedItem} = props;

  const [savingLists, setSavingLists] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    dispatch(getMaxLoanCap());
    console.log('Length: ', allSoloSaving?.data?.length);
  }, []);

  useEffect(() => {
    console.log('The Type: ', type);
    checkType(); // Solo Saving or Buddy Saving
  }, [type]);

  const checkType = async () => {
    if (type == 'Solo Savings') {

      console.log('all solo', allSoloSaving?.data)
      const filter = Object.values(allSoloSaving?.data).filter(element=> !(Object.is(element, null)))
      const usedFilter = filter.filter(element => !element.status && !element.funds_withdrawn)
      
      // setSavingLists(allSoloSaving.data);
      setSavingLists(usedFilter);
    } else if (type == 'Buddy Savings') {
      setSavingLists(allBuddySaving.data);
      console.log('All Buddy: ', allBuddySaving);
    }
  };

  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onRequestClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={[styles.heading]}>
                <TouchableOpacity
                  onPress={onRequestClose}
                  style={styles.closeIcon}>
                  <Icon
                    name="arrow-back-outline"
                    size={25}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>
                  {type.toString().toUpperCase()}
                </Text>
              </View>

              <View style={[styles.cardContainer]}>
                <ScrollView
                  contentContainerStyle={{
                    paddingBottom: 20,
                  }}
                  scrollEnabled
                  showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: COLORS.dark,
                      }}>
                      You can only withdraw from one source
                      {/* You can only withdraw from one{'\n'}account at a time. */}
                    </Text>
                  </View>
                  <>
                    {savingLists?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.card,
                            {
                              flexDirection: 'row',
                              alignItems: 'center',
                              transform: [
                                {scale: selectedIndex == index ? 1 : 0.9},
                              ],
                              //   elevation: selectedIndex == index ? 1 : 0,
                              marginTop: selectedIndex == index ? 5 : 0,
                              marginBottom: selectedIndex == index ? 5 : 0,
                            },
                          ]}
                          onPress={() => {
                            // console.log('The ID: ', item.id);
                            // console.log('Item: ', item);
                            setSelectedIndex(index);
                            selectedItem(item);

                            setTimeout(() => {
                              onRequestClose();
                            }, 600);
                          }}>
                          <Icon
                            name={
                              selectedIndex == index
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            size={25}
                            color={COLORS.light}
                            style={{marginLeft: 20}}
                          />

                          <View style={[styles.cardFlex, {flex: 1}]}>
                            <View style={[styles.progressContainer]}>
                              <AnimatedCircularProgress
                                size={60}
                                width={5}
                                rotation={0}
                                style={{zIndex: 9, position: 'relative'}}
                                fill={
                                  (Number(item.amount_saved) /
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
                                        fontFamily: 'Poppins-Medium',
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
                                <Text style={[styles.cardTitle]}>
                                  {item.name}
                                </Text>
                              </View>

                              <View style={[styles.cardAmount]}>
                                <View>
                                  <Text
                                    style={[styles.amountText, {opacity: 0.5}]}>
                                    Amount Saved
                                  </Text>
                                  <Text style={[styles.amountText]}>
                                    ₦{formatNumber(item.amount_saved) || '0.00'}
                                  </Text>
                                </View>

                                <View>
                                  <Text
                                    style={[styles.amountText, {opacity: 0.5}]}>
                                    Target Amount
                                  </Text>
                                  <Text style={[styles.amountText]}>
                                    ₦{formatNumber(item.target_amount)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
  },

  heading: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardContainer: {
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    // backgroundColor: COLORS.primary,
    width: '100%',
    flex: 1,
  },
  card: {
    width: '100%',
    backgroundColor: '#9D98EC20',
    // backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: -5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#BFBFBF50',
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

  closeIcon: {
    backgroundColor: '#46596950',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginRight: 20,
  },
});


// {"admin_target_amount": null, 
// "amount_saved": 110, 
// "auto_save": true, 
// "buddy_relationship": null, 
// "buddy_savings_id": 54, 
// "buddy_savings_referral": null, 
// "challenge_id": null, 
// "created_at": "2022-04-19T22:19:20.487Z", 
// "duration": 3, "end_date": "2022-07-20", 
// "frequency": 1, "funds_withdrawn": false, 
// "id": 42, "interest": null, 
// "interest_paid": "0.01506849315068493", 
// "interest_rate": 10, "is_admin_savings": null, 
// "locked": true, "name": "Buddy", 
// "next_due_date": "2022-04-23", 
// "num_of_buddies": 1, "periodic_savings_amount": 55,
//  "plan_rolled_over": false, 
//  "reference": "KWABA_7232860511471951650410360297_buddy_savings", 
//  "savings_type": "buddy_savings", 
//  "start_date": "2022-04-20", 
//  "status": true, 
//  "target_amount": 10000, 
//  "updated_at": "2022-04-22T06:19:50.000Z", 
//  "user_id": 20}