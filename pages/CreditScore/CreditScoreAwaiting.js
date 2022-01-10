import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {creditScoreFetch} from '../../services/network';
import {COLORS, images} from '../../util';
import Spinner from 'react-native-loading-spinner-overlay';

export default function CreditScoreAwaiting({navigation, route}) {
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    setSpinner(true);

    try {
      const res = await creditScoreFetch(route?.params);
      console.log('The Res: ', res.data);
      if (res?.data?.history?.length) {
        setSpinner(false);
        navigation.navigate('CreditScoreDashboard', route?.params);
      } else {
        setSpinner(false);
        Alert.alert(
          'Credit history',
          'Please wait, no history report yet. Check again later',
        );
      }
    } catch (error) {
      console.log('The Error: ', error);
      setSpinner(false);
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#F7F8FD'} />

      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderBottomColor: '#2b273550',
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
          }}>
          <Icon
            name="chevron-back"
            color={COLORS.dark}
            size={20}
            onPress={() => navigation.navigate('Home')}
          />
          {/* <Icon name="ellipsis-vertical" color={COLORS.white} size={20} /> */}
        </View>

        <View style={[styles.content]}>
          {/* <Image source={images.speedometer} style={styles.image} /> */}

          <View style={styles.textWrapper}>
            <Text style={styles.title}>Credit Report...</Text>
            <Text style={styles.subText}>
              We are currently processing your report, It takes up to 5 minutes.
              please click the button below to refresh.
            </Text>
          </View>

          <TouchableOpacity onPress={handleFetch}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Check again</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Spinner visible={spinner} size="small" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    backgroundColor: '#10131B',
    backgroundColor: '#F7F8FD',
    flex: 1,
  },
  content: {
    paddingHorizontal: 30,
    flex: 1,
    marginTop: 20,
    // justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    opacity: 0.5,
  },
  textWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.light,
    // color: '#a5c2d1',
  },
  subText: {
    fontSize: 14,
    color: COLORS.white,
    color: '#a5c2d180',
    color: COLORS.dark,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },

  button: {
    width: '100%',
    backgroundColor: '#212a33',
    backgroundColor: COLORS.light,
    padding: 23,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    elevation: 2,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
    color: '#536470',
    color: COLORS.white,
    // textTransform: 'capitalize',
  },
});
