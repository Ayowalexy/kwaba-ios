import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatNumber } from '../../util/numberFormatter';

const RepaymentCard = (props) => {
    const { amount, details, type } = props
    console.log(type)
    return (
        <View style={styles.container}>
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
            >
                <View>
                    <View
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                color: '#000000',
                                fontFamily: 'Poppins-Medium',
                                fontWeight: 'bold',
                                paddingRight: 20

                            }}
                        >
                            ₦{formatNumber(amount)}
                        </Text>
                        <View
                            style={{
                                width: 80,
                                height: 30,
                                borderRadius: 20,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor:
                                    type == 'paid'
                                        ? '#D5F3D5'
                                        : type == 'overdue'
                                            ? '#F9AFAF'
                                                ? type == 'due'
                                                : '#FAE4A4'
                                                    ? type == 'pending'
                                                    : "#D8D6F7B2"
                                            : '#D8D6F7B2'

                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    textTransform: 'capitalize',
                                    color: type == 'paid'
                                        ? '#309A2F'
                                        : type == 'overdue'
                                            ? '#C02C2D'
                                                ? type == 'due'
                                                : '#C29616'
                                                    ? type == 'pending'
                                                    : "#7E7ABD"
                                            : '#7E7ABD'
                                }}
                            >
                                {type}
                            </Text>
                        </View>
                    </View>
                    <Text
                        style={{
                            color: '#74797D',
                            fontSize: 12,
                            fontFamily: 'Poppins-Medium',
                            paddingTop: 10,
                            width: 300
                        }}
                    >
                        {details}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        width: 100,
                        height: 50,
                        backgroundColor: '#2A286A',
                        borderRadius: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: -90
                    }}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 12,
                            textTransform: 'uppercase'
                        }}
                    >Pay Now</Text>
                </TouchableOpacity>
            </View>
            <Text
                style={{
                    fontSize: 12,
                    color: '#2A286A',
                    fontFamily: 'Poppins-Medium',
                    fontWeight: 'bold',
                    paddingTop: 30
                }}
            >
                View Details
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 140,
        backgroundColor: '#fff',
        elevation: 10,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 8,
        marginTop: 30,
        padding: 20,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#E7E9ED'
        // paddingLeft: 30
    }
})

export default RepaymentCard