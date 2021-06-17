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
const BillsHome = ({navigation}) => {
  const billsHomeCarddata = [
    {
      image: icons.electricity,
      cardTitle: 'Electricity',
      cardSubTitle: 'Pay for your electricity easily',
      // onClickFunction: function openCardAndBank() {},
    },
    {
      image: icons.cabletv,
      cardTitle: 'Cable TV',
      cardSubTitle: 'Keep the show on, pay easily',
      // onClickFunction: function openCardAndBank() {
      //   navigation.navigate('CableTv');
      // },
    },
    {
      image: icons.internetsub,
      cardTitle: 'Internet subscription',
      cardSubTitle: 'Pay your internet subscription',
      // onClickFunction: function openCardAndBank() {},
    },
    {
      image: icons.waste,
      cardTitle: 'Waste',
      cardSubTitle: 'Sort out your waste bill',
      // onClickFunction: function openCardAndBank() {},
    },
    {
      image: icons.water,
      cardTitle: 'Water',
      cardSubTitle: 'Keep water flowing, pay easily',
      // onClickFunction: function openCardAndBank() {},
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
            <Text style={styles.headerMainText}>Pay bills</Text>
            <Text style={styles.headertext}>
              Take care of all your essentials bills
            </Text>
          </View>

          <Image source={images.billheaderimage} style={styles.headerImage} />
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
        {billsHomeCarddata.map((value, index) => {
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
                paddingVertical: 15,
                paddingHorizontal: 10,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#EAEAEA',
              }}
              key={index}
              onPress={() => {
                navigation.navigate('CableTv', {name: value.cardTitle});
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 10,
                    // backgroundColor: 'red',
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
                      {color: COLORS.primary, fontWeight: 'bold', fontSize: 16},
                    ]}>
                    {value.cardTitle}
                  </Text>
                  <Text
                    style={[
                      FONTS.body4FontStyling,
                      {color: '#ADADAD', fontSize: 12},
                    ]}>
                    {value.cardSubTitle}
                  </Text>
                </View>
              </View>

              <View>
                <Icon
                  name="arrow-forward-outline"
                  size={25}
                  style={{
                    fontWeight: '900',
                    fontSize: 18,
                    // marginLeft: 16,
                    // marginTop: 20,
                    // marginRight: 10,
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

export default BillsHome;

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
