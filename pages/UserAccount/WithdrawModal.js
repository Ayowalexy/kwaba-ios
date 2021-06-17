import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {COLORS} from '../../util';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButtonRN from 'radio-buttons-react-native';

const widthtouse = Dimensions.get('window').width;

export default function withdrawModal(props) {
  const [selectedSavingsValue, setSelectedSavingsValue] = useState('');
  const [selectedReasonValue, setSelectedReasonValue] = useState('');
  const [height, setHeight] = useState(60);
  const data = [
    {
      label: 'Full Amount',
    },
    {
      label: 'Specific Amount',
    },
  ];

  const {
    onRequestClose,
    visible,
    onConfirm,
    oldpassword,
    setoldpassword,
    newpassword,
    setnewpassword,
    confirmnewpassword,
    setconfirmnewpassword,
  } = props;
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: COLORS.primary,
                }}>
                Withdraw
              </Text>
              <Icon
                onPress={onRequestClose}
                name="close-outline"
                size={25}
                color="#465959"
              />
            </View>

            <DropDownPicker
              items={[
                {label: 'Solo Savings', value: 'Solo Savings'},
                {label: 'Buddy Savings', value: 'Buddy Savings'},
              ]}
              defaultValue={selectedSavingsValue}
              containerStyle={{height: 60}}
              style={{
                // backgroundColor: '#fafafa',
                height: 0,
                width: '100%',
              }}
              itemStyle={{
                justifyContent: 'flex-start',
                // height: 60,
              }}
              // dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => {
                setSelectedSavingsValue(item.value);
                console.log(item.value);
              }}
            />

            <View>
              <RadioButtonRN
                data={data}
                animationTypes={['pulse']}
                activeColor="#9D98EC"
                selectedBtn={(e) => setSelectedReasonValue(e.label)}
                // icon={<Icon name="check-circle" size={20} />}
                // style={{fontSize: 10, fontWeight: 'bold'}}
              />
            </View>

            {selectedReasonValue.toLowerCase() === 'full amount' && (
              <>
                <TextInput
                  style={{
                    width: '100%',
                    // height: height,
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    paddingLeft: 20,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: '#EFEFEF',
                    borderRadius: 5,
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: COLORS.dark,
                  }}
                  placeholder="Enter Amount"
                  value="₦0.00"
                  placeholderTextColor="#ADADAD"
                  keyboardType="number-pad"
                  editable={false}
                />
                {/* </View> */}
              </>
            )}

            {selectedReasonValue.toLowerCase() === 'specific amount' && (
              <>
                <View>
                  <Text
                    style={{
                      position: 'absolute',
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: COLORS.dark,
                      // transform: [{translateY: -50}],
                      marginTop: 30,
                      marginLeft: 20,
                    }}>
                    ₦
                  </Text>
                  <TextInput
                    style={{
                      width: '100%',
                      // height: height,
                      paddingVertical: 15,
                      paddingHorizontal: 20,
                      paddingLeft: 50,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      marginTop: 10,
                      borderWidth: 1,
                      borderColor: '#EFEFEF',
                      borderRadius: 5,
                      // fontWeight: 'bold',
                    }}
                    placeholder="Enter Amount"
                    placeholderTextColor="#ADADAD"
                    keyboardType="number-pad"
                  />
                </View>
              </>
            )}

            <TextInput
              style={{
                width: '100%',
                height: height,
                padding: 20,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#EFEFEF',
                borderRadius: 5,
                // fontWeight: 'bold',
              }}
              multiline
              // numberOfLines={4}
              placeholder="Reason"
              placeholderTextColor="#ADADAD"
              onContentSizeChange={(e) =>
                setHeight(e.nativeEvent.contentSize.height)
              }
            />

            <TouchableOpacity
              // onPress={onConfirm}
              style={[styles.btn, {backgroundColor: '#00DC99'}]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 12,
                  textTransform: 'uppercase',
                }}>
                withdraw
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'CircularStd',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    // top: 50,
    minHeight: 200,
    maxHeight: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    // borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    // padding: 35,
    // paddingTop: 15,
    // shadowColor: '#BFBFBF',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 6,
  },
  btn: {
    width: '100%',
    // height: 70,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    paddingVertical: 20,
  },
  textInput: {
    width: widthtouse * 0.85,
    height: 70,
    borderRadius: 10,
    padding: 16,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    borderColor: '#ADADAD',
    borderWidth: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
