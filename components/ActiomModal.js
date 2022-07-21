import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../util';
import { useNavigation } from '@react-navigation/native';



const ActionModal = (props) => {
    const { visible, setVisible, type, msg } = props
    const navigation = useNavigation();
    return (
        <Modal
            visible={visible}
            setVisible={setVisible}
            onRequestClose={() => setVisible(!visible)}
            animationType='slide'
            transparent={true}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        width: '80%',
                        // height: 400,
                        paddingTop: 40,
                        paddingBottom: 50,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        borderRadius: 15
                    }}
                >
                    <Icon name={
                        type == 'success'
                            ? 'ios-checkmark-circle-sharp'
                            : type == 'timeout'
                                ? 'refresh-circle'
                                : type == 'error'
                                    ? 'md-information-circle'
                                    : 'ios-timer'
                    } size={60} color=
                        {
                            type == 'success'
                                ? COLORS.secondary
                                : type == 'timeout'
                                    ? COLORS.yellow
                                    : type == 'error'
                                        ? COLORS.error
                                        : COLORS.warning
                        }
                    />
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: COLORS.dark,
                        textAlign: 'center',
                    }}>
                        {msg?.header}
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        lineHeight: 25,
                        color: COLORS.dark,
                        textAlign: 'center',
                        marginTop: 10,
                        width: 250,
                        paddingTop: 14,
                    }}>
                        {msg?.text}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            if (msg?.navigation?.id) {
                                navigation.navigate('BuddySavingDashBoard', {
                                    id: msg?.navigation?.id
                                });
                            }
                            setVisible(false)
                        }}
                        style={{
                            backgroundColor:
                                type == 'success'
                                    ? COLORS.secondary
                                    : type == 'timeout'
                                        ? COLORS.yellow
                                        : type == 'error'
                                            ? COLORS.error
                                            : COLORS.warning
                            ,
                            marginTop: 30,
                            padding: 10,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                                fontWeight: 'bold',
                                fontSize: 12,
                                textTransform: 'uppercase',
                            }}
                        >
                            {msg?.action}
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    )
}

export default ActionModal