import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {COLORS} from '../../util/index';
import ProgressBar from 'react-native-animated-progress';
import {formatNumber} from '../../util/numberFormatter';

export default function Joined(props) {
  useEffect(() => {
    // dispatch(getSavingsUnderChallengeList(props.id));
    console.log('Hello Here:', props.data);
  }, []);

  const handleNavigate = (item) => {
    // console.log(item);
    console.log(props.allData);
    props.navigation.navigate('JoinChallengeDashboard', {data: props.allData});
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => handleNavigate(item)}
        style={[styles.card]}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View style={{marginTop: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={[styles.cardBody, {color: COLORS.dark}]}
                  numberOfLines={2}>
                  Amount Saved
                </Text>

                <Text style={[styles.cardBody, {color: COLORS.dark}]}>
                  Target Amount
                </Text>
              </View>

              <View style={{marginVertical: 5}}>
                <ProgressBar
                  progress={
                    (Number(item.amount_save) / Number(item.target_amount)) *
                    100
                  }
                  height={7}
                  backgroundColor={COLORS.orange}
                  trackColor="#5A4CB120"
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.cardBody}>
                  ₦{formatNumber(item.amount_save)}
                </Text>

                <Text style={styles.cardBody}>
                  ₦{formatNumber(item.target_amount)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={{flex: 1}}>
        <FlatList
          data={props?.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    borderRadius: 10,
    elevation: 8,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    flexDirection: 'column',
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5A4CB1',
    color: COLORS.dark,
    lineHeight: 20,
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 20,
    color: COLORS.dark,
    color: '#555',
    color: '#5A4CB1',
  },
});
