import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, images, icons} from '../../util/index';

const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('window').width;
const headerHeight = screenheight / 4;
const width = Dimensions.get('window').width;
const AirtimeHome = ({navigation}) => {
  const airtimeData = [
    {
      image: images.airtime1,
      cardTitle: 'MTN',
      onClickFunction: function openCardAndBank() {},
    },
    {
      image: images.airtime2,
      cardTitle: 'Airtel',
      onClickFunction: function openCardAndBank() {},
    },
    {
      image: images.airtime3,
      cardTitle: 'Glo',
      onClickFunction: function openCardAndBank() {},
    },
    {
      image: images.airtime4,
      cardTitle: '9mobile',
      onClickFunction: function openCardAndBank() {},
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={25}
          style={{fontWeight: '900'}}
          color={COLORS.light}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.headerMainText}>Buy Airtime</Text>
            <Text style={styles.headertext}>
              Recharge amy network easily and fast
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
          borderRadius: 10,
          width: width * 0.9,
          marginTop: 20,
        }}>
        {airtimeData.map((value, index) => {
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
                borderColor: '#EAEAEA',
              }}
              key={index}
              onPress={() => {
                // value.cardTitle.toLocaleLowerCase() === 'mtn'
                //   ? console.log('True')
                //   : console.log('False');
                navigation.navigate('PurchaseAirtime', {name: value.cardTitle});
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: 20,
                  }}
                  source={value.image}
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
                      FONTS.h3FontStyling,
                      {color: COLORS.primary, fontWeight: 'bold', fontSize: 14},
                    ]}>
                    {value.cardTitle}
                  </Text>
                </View>
              </View>

              <View>
                <Icon
                  name="arrow-forward-outline"
                  size={20}
                  style={{
                    fontWeight: '900',
                    fontSize: 25,
                  }}
                  color={COLORS.primary}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
    fontFamily: 'CircularStd',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  headertext: {
    width: '70%',
    color: COLORS.white,
    fontFamily: 'CircularStd-bold,Book',
    textAlign: 'justify',
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
});
