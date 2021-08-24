import React, {useState} from 'react';
import {
  //@ts-ignore
  Text, //@ts-ignore
  StyleSheet, //@ts-ignore
  ScrollView, //@ts-ignore
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../util';
import CreditCardModal from '../../components/CreditCard/CreditCardModal';

const PaymentForm: React.FC = (props: any) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <ScrollView contentContainerStyle={styles.content}>
        <Icon
          onPress={() => props.navigation.navigate('Home')}
          name="arrow-back-outline"
          size={25}
          style={{fontWeight: '900', zIndex: 2}}
          color={COLORS.primary}
        />
        <Text style={styles.title}>Payment details</Text>
        <TouchableOpacity onPress={() => setModal(true)}>
          <Text>Open Modal</Text>
        </TouchableOpacity>
      </ScrollView>

      <CreditCardModal
        onRequestClose={() => {
          setModal(!modal);
        }}
        visible={modal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 20,
    paddingHorizontal: 36,
  },
  title: {
    fontFamily: 'Avenir-Heavy',
    color: 'black',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 32,
  },
});

export default PaymentForm;
