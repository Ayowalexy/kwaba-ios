import React, {useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {images, icons, COLORS} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PaymentTypeModalSavings(props) {
  const {
    visible,
    onRequestClose,
    setPaymentType,
    setPaymentTypeValue,
    mandateType,
    showConfirmModal,
  } = props;

  useEffect(() => {
    console.log('The Mandate: ', mandateType);
  }, []);

  const md = [
    'autoSaveAndPayment',
    'autoSaveAndNoPayment',
    'manualSaveAndPayment',
    'manualSaveAndNoPayment',
  ];

  const data0 = [
    {
      name: 'Debit Card',
      icon: 'card',
      tag: 'card',
      subtitle:
        'We will automatically move money from your bank account to your Kwaba savings plan based on your saving frequency',
    },
    {
      name: 'Your Wallet',
      icon: 'wallet',
      tag: 'wallet',
      subtitle:
        'Money will be automatically moved from your Kwaba wallet to your Kwaba savings plan. Note, your wallet will have to be funded sufficiently for us to successfully fund your savings plan',
    },
  ];

  const data1 = [
    {
      name: 'Debit Card',
      icon: 'card',
      tag: 'card',
    },
    {name: 'Bank Transfer', icon: 'home', tag: 'bank_transfer'},
    {
      name: 'Your Wallet',
      icon: 'wallet',
      tag: 'wallet',
    },
  ];

  const RenderItem = ({data, show}) => {
    return (
      <>
        <View style={{marginTop: 70, width: '100%'}}>
          <Text style={styles.heading}>
            Select a source to fund your savings
          </Text>
          {data?.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  // if (showConfirmationModal) {
                  //   showConfirmModal(true);
                  //   setPaymentType(item.tag);
                  //

                  //   console.log('Item Tag: ', item.tag);
                  //   console.log('Show Confirmation Modal');
                  // } else {
                  //   showConfirmModal(true);
                  //   setPaymentType(item.tag);
                  // }

                  if (show == 1) {
                    // showConfirmModal(true);
                    setPaymentType(item.tag);
                  }
                  if (show == 2) {
                    showConfirmModal(true);
                    setPaymentType(item.tag);
                  }
                  if (show == 3) {
                    showConfirmModal(true);
                    setPaymentTypeValue(item.tag);
                  }
                  if (show == 4) {
                    showConfirmModal(true);
                    // setPaymentType(item.tag);
                  }

                  onRequestClose();
                }}
                key={index}
                style={{
                  width: '100%',
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderTopWidth: 1,
                  borderTopColor: '#BFBFBF30',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: '#00DC9920',
                    marginRight: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name={item.icon} size={20} color={COLORS.secondary} />
                </View>

                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: COLORS.dark,
                    }}>
                    {item.name}
                  </Text>
                  {item.subtitle && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: COLORS.dark,
                        marginTop: 10,
                        lineHeight: 20,
                      }}>
                      {item.subtitle}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.content}>
              <TouchableOpacity onPress={onRequestClose} style={styles.close}>
                <Icon name="close" size={25} color={COLORS.dark} />
              </TouchableOpacity>

              {mandateType == md[0] && (
                <RenderItem data={data0} mandateType={mandateType} show={1} />
              )}
              {mandateType == md[1] && (
                <RenderItem data={data0} mandateType={mandateType} show={2} />
              )}
              {mandateType == md[2] && (
                <RenderItem data={data1} mandateType={mandateType} show={3} />
              )}
              {mandateType == md[3] && (
                <RenderItem data={data1} mandateType={mandateType} show={4} />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'CircularStd',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 200,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  close: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.grey,
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    top: 20,

    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
  },

  heading: {
    fontSize: 14,
    color: COLORS.dark,
    fontWeight: 'bold',
    // marginBottom: 20,
    paddingLeft: 30,
    backgroundColor: '#BFBFBF20',
    paddingVertical: 20,
    // textAlign: 'center',
  },
});
