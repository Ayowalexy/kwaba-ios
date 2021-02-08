import React from "react";
import {View, Text} from 'react-native';
import designs from './style';
import {COLORS,icons}from '../../util/index';

const Welcome = () => {
    return (
        <View>
            <Text style={[designs.test_style, designs.test_style_2, COLORS.primary]} class>Welcome</Text>
        </View>
    )
}

export default Welcome;