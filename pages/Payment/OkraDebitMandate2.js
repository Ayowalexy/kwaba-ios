import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MonoProvider, useMonoConnect } from '@mono.co/connect-react-native';

const config = {
  publicKey: "live_pk_3MSVtE6Jtj2K6ZGMrkCT",
  onClose: () => alert('Widget closed'),
  onSuccess: (data) => {
    const code = data.getAuthCode()
    console.log("Access code", code)
  }
}

function LinkAccount() {
  const { init } = useMonoConnect();

  return (
    <View style={{marginBottom: 10}}>
      <TouchableOpacity onPress={() => init()}>
        <Text style={{color: 'blue'}}>Link your bank account</Text>
      </TouchableOpacity>
    </View>
  )
}

function ReauthoriseUserAccount({reauth_token}) {
  const { reauthorise } = useMonoConnect()

  return (
    <View style={{marginBottom: 10}}>
      <TouchableOpacity onPress={() => reauthorise(reauth_token)}>
        <Text style={{color: 'blue'}}>Reauthorise user account</Text>
      </TouchableOpacity>
    </View>
  )
}

function InitiateDirectDebit() {
  const { init } = useMonoConnect();

  return (
    <View style={{marginBottom: 10}}>
      <TouchableOpacity onPress={() => init()}>
        <Text style={{color: 'blue'}}>Initiate Mono Direct debit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function OkraDebitMandate2({navigation}) {
  const reauth_token = "code_xyz";
  const payConfig = {
    scope: "payments",
    data: {
      type: "recurring-debit", // "one-time-debit" | "recurring-debit"
      amount: 250000, // amount in kobo
      description: "Wallet funding",
      plan: "plan-234", // only for recurring payment
      currency: "NGN", // (optional) default to NGN
      period: "monthly", // only for recurring payment
      reference: "mono_r27bn0he820e", // optional 
    }
  }

  return (
    <MonoProvider {...config}>
      <View style={styles.container}>
        {/* <LinkAccount /> */}

        <MonoProvider {...{...config, ...payConfig}}>
          <InitiateDirectDebit />
        </MonoProvider>

        {/* <ReauthoriseUserAccount reauth_token={reauth_token} /> */}
      </View>
    </MonoProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
});