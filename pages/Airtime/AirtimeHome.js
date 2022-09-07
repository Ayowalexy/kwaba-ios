import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import AirtimeHistory from '../../components/AirtimeHistory';
import {COLORS, FONTS, images, icons} from '../../util/index';
import { GLO, NINE_FLAG, AIRTEL, MTN } from '../../util/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  getAirtimeBillTrans,
  getBillsCategory,
} from '../../redux/actions/billsAction';

const AirtimeHome = ({navigation}) => {
  const dispatch = useDispatch();
  const statusBarHeight = useSafeAreaInsets().top;
  const getBillsCategoryLists = useSelector(
    (state) => state.getBillCategoryReducer,
  );

  const getAirtime = useSelector((state) => state.getAirtimeReducer);

  const [airtimeData, setAirtimeData] = useState([]);
  const [showAirtimeHistoryModal, setShowAirtimeHistoryModal] = useState(false);

  const handleClick = (value) => {
    navigation.navigate('PurchaseAirtime', {
      name: value.name,
      data: getAirtime?.data,
    });
  };

  useEffect(() => {
    dispatch(getAirtimeBillTrans());
  }, []);

  return (
    <View style={[styles.container, { marginTop: Platform.OS == 'ios' ? statusBarHeight : 0}]}>
      <View style={styles.header}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={25}
          style={{fontWeight: '900'}}
          color={COLORS.light}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column', marginLeft: 10}}>
            <Text style={styles.headerMainText}>Buy Airtime</Text>
            <Text style={styles.headertext}>
              Recharge any network easily and fast
            </Text>
          </View>

          <Image source={images.buyAirtime} style={styles.headerImage} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled
        style={{
          flex: 1,
          flexDirection: 'column',
          alignSelf: 'center',
          width: '100%',
          marginTop: 20,
          paddingHorizontal: 20,
        }}>
        {getAirtime?.data?.filter(ele => ele?.name !== 'Foreign Airtime')?.map((value, index) => {
          return (
            <TouchableOpacity
              style={{
                // height: 78,
                backgroundColor: COLORS.white,
                flexDirection: 'row',
                // marginTop: 10,
                marginBottom: 10,
                borderRadius: 10,
                justifyContent: 'space-between',
                paddingVertical: 10,
                paddingHorizontal: 10,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#EAEAEA50',
              }}
              key={index}
              onPress={() => handleClick(value)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: 20,
                    borderRadius: 10,
                  }}
                  source={
                    value?.name?.toLowerCase()?.includes('mtn')
                    ? MTN
                    : value?.name?.toLowerCase()?.includes('airtel')
                    ? AIRTEL
                    : value?.name?.toLowerCase()?.includes('glo')
                    ? GLO
                    : value?.name?.toLowerCase()?.includes('9mobile')
                    ? NINE_FLAG
                    : null
                  }
                  // source={{uri: value.image}}
                  resizeMode="contain"
                />
                <View
                  style={{
                    flexDirection: 'column',
                    // borderWidth: 1,
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={[
                      // FONTS.h3FontStyling,
                      {
                        color: COLORS.primary,
                        fontWeight: 'bold',
                        fontSize: 12,
                      },
                    ]}>
                    {value.name}
                  </Text>
                </View>
              </View>

              <View>
                <Icon
                  name="arrow-forward-outline"
                  size={20}
                  style={{
                    fontWeight: '900',
                    marginRight: 10,
                  }}
                  color={COLORS.dark}
                />
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={[styles.transactionHistory]}>
          <TouchableOpacity
            onPress={() => {
              setShowAirtimeHistoryModal(true);
              dispatch(getAirtimeBillTrans());
            }}>
            <Text style={[styles.transactionHistoryText]}>
              View transactions history
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showAirtimeHistoryModal && (
        <AirtimeHistory
          onRequestClose={() =>
            setShowAirtimeHistoryModal(!showAirtimeHistoryModal)
          }
          visible={showAirtimeHistoryModal}
        />
      )}
    </View>
  );
};

export default AirtimeHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  // marginTop: -55,
  // marginLeft: 30,
  header: {
    // flex: 1,
    flexDirection: 'column',
    // maxHeight: 178,
    backgroundColor: '#2A286A',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    padding: 20,
    paddingBottom: 40,
    overflow: 'hidden',
    // paddingLeft: 20,
    // paddingTop: 20,
  },
  headerMainText: {
    // marginLeft: 16,
    color: COLORS.yellow,
    fontFamily: 'Poppins-Medium',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  headertext: {
    width: '70%',
    color: COLORS.white,
    fontFamily: 'Poppins-Medium',
    // textAlign: 'justify',
    lineHeight: 20,
    // marginLeft: 16,
  },
  headerImage: {
    position: 'absolute',
    right: -30,
    bottom: -40,
    flex: 1,
    height: 150,
    width: 200,
    resizeMode: 'contain',
    // backgroundColor: 'red',
  },

  transactionHistory: {
    marginTop: 20,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionHistoryText: {
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: 'bold',
  },
});
