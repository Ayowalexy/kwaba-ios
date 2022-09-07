import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Text, View, Modal } from "react-native";


const Preloader = ({visible, setVisible}) => {
    const anim = useRef(new Animated.Value(1)).current;


    const _start = () => {
        Animated.loop(Animated.sequence([
            Animated.timing(anim, {
                toValue: 1.2,
                duration: 1000,
                useNativeDriver: true
            }),
            Animated.timing(anim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            })

        ]),

            { iterations: 1000 }
        ).start()
    }

    useEffect(() => {
        _start()
    }, [])
    return (
        <Modal
            visible={visible}
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
                <Animated.View
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: [
                            {
                                scale: anim
                            }
                        ]
                    }}
                >
                    <ActivityIndicator size={20} color='#fff' />
                    <Text style={{
                        color: '#fff',
                        fontSize: 17,
                        paddingTop: 10,
                        fontFamily: 'Poppins-Medium',
                    }}>Loading, Please wait...</Text>
                </Animated.View>


            </View>
        </Modal>
    )
}

export default Preloader