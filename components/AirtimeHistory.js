import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS, images} from '../util';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';
import AirtimeHistoryDetail from './AirtimeHistoryDetail';
import {formatNumber} from '../util/numberFormatter';
import {useSelector} from 'react-redux';
import moment from 'moment';
// import {SwipeablePanel} from 'rn-swipeable-panel';

export default function AirtimeHistory(props) {
  const {onRequestClose, visible} = props;
  const [spinner, setSpinner] = useState(false);
  const [filterHistory, setFilterHistory] = useState('');
  const [showHistoryDetail, setShowHistoryDetail] = useState(false);
  const [active, setActive] = useState(false);

  const getAirtimeBillTransReducer = useSelector(
    (state) => state.getAirtimeBillTransReducer,
  );

  useEffect(() => {
    console.log('The KOKO The KOKO: ', getAirtimeBillTransReducer);
  }, []);

  const filter = [{name: 'Network'}, {name: 'All Status'}, {name: 'Date'}];

  const filterItemsWidth = Dimensions.get('window').width / 3 - 20;

  const handleShowDetails = (item) => {
    // console.log('Details...', item);
    setShowHistoryDetail(true);
  };

  // this gives an object with dates as keys
  const groups = getAirtimeBillTransReducer?.data?.reduce((item, data) => {
    const date = data.created_at;
    if (!item[date]) {
      item[date] = [];
    }
    item[date].push(data);
    return item;
  }, {});

  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups || {}).map((date) => {
    return {
      date,
      data: groups[date],
    };
  });

  const openPanel = () => {
    setActive(true);
  };

  const closePanel = () => {
    setActive(false);
  };

  return (
    // <View style={styles.centeredView}>
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <View
            style={{
              height: 50,
              paddingHorizontal: 20,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={onRequestClose}>
              <Icon name="arrow-back" size={25} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalView}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                  marginLeft: 20,
                }}>
                Transaction History
              </Text>
              {getAirtimeBillTransReducer?.length < 1 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: COLORS.dark,
                      opacity: 0.5,
                    }}>
                    No Transactions
                  </Text>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      marginBottom: 10,
                      paddingHorizontal: 20,
                    }}>
                    {filter?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            borderWidth: 1,
                            borderColor: '#BFBFBF50',
                            borderRadius: 5,
                            width: filterItemsWidth,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: COLORS.dark,
                            }}>
                            {item.name}
                          </Text>
                          {item.name == 'Date' ? (
                            <IconFA
                              name="calendar-o"
                              size={20}
                              color={COLORS.dark}
                              style={{
                                marginTop: 1,
                              }}
                            />
                          ) : (
                            <IconFA5
                              name="angle-down"
                              size={15}
                              color={COLORS.dark}
                              style={{
                                marginTop: 1,
                              }}
                            />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <ScrollView
                    scrollEnabled
                    showsVerticalScrollIndicator={false}>
                    {groupArrays?.reverse()?.map((item, index) => {
                      return (
                        <View key={index}>
                          <View
                            style={{
                              paddingVertical: 20,
                              paddingHorizontal: 30,
                              backgroundColor: '#9D98EC20',
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: COLORS.dark,
                              }}>
                              {moment(item.date).format('Do MMMM YYYY')}
                            </Text>
                          </View>
                          <View>
                            {item.data.map((item, index) => {
                              return (
                                <TouchableOpacity
                                  onPress={openPanel}
                                  key={index}
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingVertical: 15,
                                    paddingHorizontal: 30,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#BFBFBF20',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <View
                                      style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 30,
                                        backgroundColor: '#9D98EC50',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 10,
                                      }}>
                                      <Image
                                        source={
                                          item.billsServiceID == 'airtel'
                                            ? images.airtime2
                                            : item.billsServiceID == 'glo'
                                            ? images.airtime3
                                            : images.airtime1
                                        }
                                        style={{
                                          width: 20,
                                          height: 20,
                                          borderRadius: 50,
                                        }}
                                      />
                                    </View>
                                    <View>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color: COLORS.dark,
                                          fontWeight: 'normal',
                                        }}>
                                        {item.billsRecepient}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 10,
                                          color: COLORS.grey,
                                          marginLeft: 5,
                                        }}>
                                        {item.billsServiceID
                                          .toString()
                                          .toUpperCase()}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={{alignItems: 'flex-end'}}>
                                    <Text
                                      style={{
                                        fontSize: 10,
                                        color:
                                          item.status == 1
                                            ? COLORS.success
                                            : COLORS.error,
                                        fontWeight: 'bold',
                                        marginRight: 5,
                                      }}>
                                      {item.status == 1
                                        ? `+ ${formatNumber(
                                            Number(item.amount).toFixed(2),
                                          )}`
                                        : formatNumber(
                                            Number(item.amount).toFixed(2),
                                          )}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 10,
                                        color: COLORS.grey,
                                      }}>
                                      {moment(item.created_at).format(
                                        'DD MMM YYYY',
                                      )}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </View>
                      );
                    })}
                  </ScrollView>
                </>
              )}
            </View>
          </View>
        </View>

        {/* <SwipeablePanel
          fullWidth
          isActive={active}
          onClose={closePanel}
          closeOnTouchOutside={true}
          onPressCloseButton={closePanel}
          style={{backgroundColor: COLORS.white}}></SwipeablePanel> */}
      </Modal>

      {showHistoryDetail && (
        <AirtimeHistoryDetail
          onRequestClose={() => {
            setShowHistoryDetail(!showHistoryDetail);
          }}
          visible={showHistoryDetail}
        />
      )}

      <Spinner visible={spinner} size="large" />
    </>

    // </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    paddingVertical: 20,
    // paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 50,
  },
});
