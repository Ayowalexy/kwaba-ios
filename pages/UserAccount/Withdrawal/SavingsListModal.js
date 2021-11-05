import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../util';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {formatNumber} from '../../../util/numberFormatter';
import {useDispatch, useSelector} from 'react-redux';

export default function SavingsListModal(props) {
  const dispatch = useDispatch();
  const allSoloSaving = useSelector((state) => state.getSoloSavingsReducer);
  const allBuddySaving = useSelector((state) => state.getBuddySavingsReducer);
  const {onRequestClose, visible, type, navigation, selectedItem} = props;
  const [savingLists, setSavingLists] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    // console.log('The Type: ', type);
    checkType(); // Solo Saving or Buddy Saving
  }, [type]);

  const checkType = async () => {
    if (type == 'Solo Savings') {
      setSavingLists(allSoloSaving);
    } else if (type == 'Buddy Savings') {
      setSavingLists(allBuddySaving);
      //   console.log('All Buddy: ', allBuddySaving);
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
                      You can only withdraw from one{'\n'}account at a time.
                    </Text>
                  </View>
                  <>
                    {savingLists?.data?.map((item, index) => {
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
                                <Text style={[styles.cardTitle]}>
                                  {item.name}
                                </Text>
                              </View>

                              <View style={[styles.cardAmount]}>
                                <Text style={[styles.amountText]}>
                                  ₦{formatNumber(item.amount_save) || '0.00'}
                                </Text>
                                <Text
                                  style={[styles.amountText, {opacity: 0.5}]}>
                                  ₦{formatNumber(item.target_amount)}
                                </Text>
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
    fontFamily: 'CircularStd',
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
