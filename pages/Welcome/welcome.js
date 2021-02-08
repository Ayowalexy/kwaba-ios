import React from "react";
import { View, Text, SafeAreaView } from 'react-native';
import designs from './style';
import { COLORS, icons, FONTS } from '../../util/index';

const Welcome = () => {
    return (
        <SafeAreaView>
            <View>
                <Text style={[designs.test_style, designs.test_style_2, COLORS.primary, FONTS.largeTitle]} class>Welcome</Text>
            </View>
        </SafeAreaView>
    )
}

export default Welcome;