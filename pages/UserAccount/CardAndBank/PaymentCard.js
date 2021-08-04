import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  FlatList,
  Animated,
  StyleSheet,
} from 'react-native';
import {icons} from '../../../util/index';
// import designs from './style';
import {COLORS, FONTS, images} from '../../../util/index';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import AddBankAccountModal from '../../../components/addBankAccountModal';
import Spinner from 'react-native-loading-spinner-overlay';

import Modal from 'react-native-modal';
import AddPaymentCardModal from '../../../components/addPaymentCardModal';
import ActionModal from './ActionModal';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PaymentCard(props) {
  const [paymentCardModal, setPaymentCardModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [clickedID, setClickedID] = useState('');
  const [clickedItem, setClickedItem] = useState('');

  const {allCards, paymentCards} = props;

  const handlePress = async (item) => {
    // console.log('Hello....', item.id);
    setActionModal(true);
    setClickedID(item.id);
    setClickedItem(item);
  };

  const renderPaymentCards = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.paymentCard,
        {
          borderWidth: item.id == clickedID ? 2 : 0,
          borderColor: item.id == clickedID ? COLORS.secondary : 'none',
        },
      ]}
      onPress={() => {
        handlePress(item);
      }}>
      <View>
        <View>
          <Text
            style={{fontSize: 14, color: COLORS.primary, fontWeight: 'bold'}}>
            ****{item.last_four_digits}
          </Text>
        </View>
        <View style={{marginTop: 100}}>
          <Text style={{fontSize: 10, fontWeight: 'bold', color: COLORS.light}}>
            EXPIRES
          </Text>
          <Text style={{fontSize: 10, fontWeight: 'bold', color: COLORS.light}}>
            {item.exp_month}-{item.exp_year}
          </Text>
        </View>
        <Image
          source={
            item.type == 'mastercard'
              ? images.mastercarddesign
              : images.visacarddesign
          }
          resizeMode="contain"
          style={{
            height: 200,
            width: 150,
            resizeMode: 'contain',
            position: 'absolute',
            right: -22,
          }}
        />

        {item.defaultcard == 1 && (
          <Icon
            name="checkbox"
            size={20}
            color={COLORS.secondary}
            style={{
              position: 'absolute',
              top: -10,
              right: -10,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <View style={[styles.content]}>
          <Text style={[styles.contentTitle]}>Payment Card</Text>
          <View style={[styles.contentView]}>
            {!paymentCards.length ? (
              <>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 20,
                    paddingLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => setPaymentCardModal(true)}
                    style={[styles.addButtonEmpty]}>
                    <IconFA5 name="plus" size={15} color={COLORS.primary} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: 20,
                      color: COLORS.dark,
                      fontWeight: 'bold',
                      fontSize: 12,
                    }}>
                    Add Payment Card
                  </Text>
                </View>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => setPaymentCardModal(true)}
                  style={[styles.addButton]}>
                  <IconFA5 name="plus" size={15} color={COLORS.white} />
                </TouchableOpacity>

                <FlatList
                  data={paymentCards}
                  renderItem={renderPaymentCards}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={{
                    marginLeft: 10,
                  }}
                  contentContainerStyle={{
                    paddingVertical: 5,
                  }}
                />
              </>
            )}
          </View>
        </View>

        <Modal
          isVisible={successMsg}
          onBackButtonPress={() => setSuccessMsg(false)}
          onBackdropPress={() => setSuccessMsg(false)}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <Text style={{color: COLORS.secondary, fontWeight: 'bold'}}>
              Card successfully added!
            </Text>
          </View>
        </Modal>
      </ScrollView>

      <AddPaymentCardModal
        onRequestClose={() => setPaymentCardModal(!paymentCardModal)}
        visible={paymentCardModal}
        setDisplayAllPaymentCards={(all) => allCards(all)}
      />

      <ActionModal
        onRequestClose={() => {
          setActionModal(!actionModal);
          setClickedID('');
        }}
        visible={actionModal}
        type="card"
        clickedItem={clickedItem}
      />
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
  content: {
    paddingLeft: 20,
    // borderWidth: 1,
    paddingVertical: 10,
    marginTop: 20,
    // backgroundColor: '#FFFFFF',
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    // marginLeft: 10,
    color: COLORS.primary,
  },
  contentView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 10,
  },
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonEmpty: {
    width: 40,
    height: 40,
    borderRadius: 40,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: COLORS.grey,
  },
  paymentCard: {
    width: 150,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    padding: 20,
    elevation: 1,
    overflow: 'hidden',
  },
  bankCard: {
    width: 250,
    height: 140,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    padding: 20,
    elevation: 1,
    overflow: 'hidden',
  },
});
