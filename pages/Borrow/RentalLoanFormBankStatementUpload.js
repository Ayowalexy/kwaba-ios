import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import ManualUploadModal from '../../components/ManualUploadModal';
import {MonoProvider, useMonoConnect} from '@mono.co/connect-react-native';

const ConnectWithMono = () => {
  const {init} = useMonoConnect();
  return (
    <TouchableOpacity onPress={() => init()} style={[styles.card]}>
      <Text style={[styles.title]}>Mobile/interent banking</Text>
      <Text style={[styles.body]}>
        Securely send us your bank statement from your mobile/internet banking.
        We do not have access to your login details or money in your account.
      </Text>
      <Image source={images.mobileInternetBanking} style={[styles.img]} />
    </TouchableOpacity>
  );
};

export default function RentalLoanFormBankStatementUpload({navigation}) {
  const [showManualUploadModal, setShowManualUploadModal] = useState(false);
  const bankStatementUpload = [
    {
      title: 'Manual Upload',
      body:
        'Upload your bank statement directly from your phone if you have it handy',
      img: images.manualUpload,
    },
    {
      title: 'Mobile/interent banking',
      body:
        'Securely send us your bank statement from your mobile/internet banking. We do not have access to your login details or money in your account.',
      img: images.mobileInternetBanking,
    },
    {
      title: 'Bank request',
      body:
        'Request your bank statement directly from your bank via email seamlessly.',
      img: images.bankRequest,
    },
  ];

  const config = {
    publicKey: 'live_pk_3MSVtE6Jtj2K6ZGMrkCT',
    onClose: () => alert('Widget closed'),
    onSuccess: async (data) => {
      const code = data.getAuthCode();
      console.log('Access code', code);
      await postData(code);
    },
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{
          fontWeight: '900',
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
        color={COLORS.primary}
      />
      <ScrollView>
        <View style={styles.content}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Bank Statement Upload
          </Text>

          <View>
            <TouchableOpacity
              onPress={() => setShowManualUploadModal(!showManualUploadModal)}
              style={[styles.card]}>
              <Text style={[styles.title]}>Manual Upload</Text>
              <Text style={[styles.body]}>
                Upload your bank statement directly from your phone if you have
                it handy.
              </Text>
              <Image source={images.manualUpload} style={[styles.img]} />
            </TouchableOpacity>

            <MonoProvider {...config}>
              <ConnectWithMono />
            </MonoProvider>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RentalLoanFormBankStatementUploadEmail')
              }
              style={[styles.card]}>
              <Text style={[styles.title]}>Bank request</Text>
              <Text style={[styles.body]}>
                Request your bank statement directly from your bank via email
                seamlessly.
              </Text>
              <Image source={images.bankRequest} style={[styles.img]} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ManualUploadModal
        onRequestClose={() => setShowManualUploadModal(!showManualUploadModal)}
        visible={showManualUploadModal}
        navigation={navigation}
        // onClick={(value) => setSelectedPayMethod(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 0.5,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },

  text: {
    fontSize: 12,
    fontWeight: '200',
    textAlign: 'center',
    marginTop: 0,
    color: '#BFBFBF',
    lineHeight: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  body: {
    fontSize: 12,
    lineHeight: 20,
    color: '#ADADAD',
    marginTop: 20,
    width: '80%',
    // fontWeight: 'bold',
  },
  img: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    top: -20,
  },
});
