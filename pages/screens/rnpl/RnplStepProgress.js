import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {COLORS} from '../../../util';
import stepsArray from '../../../util/stepsArray';
import Icon from 'react-native-vector-icons/Ionicons';

const Item = ({item, index}) => (
  <View
    style={{
      width: index == 0 ? 0 : 70,
      height: 2,
      backgroundColor: '#61cd8f',
      backgroundColor:
        item.status == 'complete'
          ? '#61cd8f'
          : item.status == 'start'
          ? '#8fc1ed'
          : '#d9f4e3',
      justifyContent: 'center',
      alignItems: 'flex-end',
    }}>
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 25,
        backgroundColor:
          item.status == 'complete'
            ? '#61cd8f'
            : item.status == 'start'
            ? '#8fc1ed'
            : '#d9f4e3',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {item.status == 'complete' && (
        <Icon
          name="ios-checkmark-sharp"
          style={{
            color: COLORS.white,
            fontSize: 14,
          }}
        />
      )}

      {item.status != 'complete' && (
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 20,
            backgroundColor: '#effbf7',
          }}
        />
      )}
    </View>
  </View>
);

export default function RnplStepProgress({children}) {
  const renderItem = ({item, index}) => <Item item={item} index={index} />;
  return (
    <View style={[styles.container]}>
      <FlatList
        data={stepsArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{flexGrow: 0}}
        contentContainerStyle={{
          paddingLeft: 40,
          paddingRight: 20,
          paddingVertical: 30,
          borderWidth: 1,
        }}
      />
      <View style={[styles.content]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#effbf7',
  },

  content: {
    flex: 1,
    elevation: 100,
    backgroundColor: COLORS.white,
  },
});
