import React, { ReactElement } from 'react';
import { View, StyleSheet, Text, Dimensions, StatusBar, DimensionValue } from 'react-native';

interface HeaderProps {
    title?: string;
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    gap?: number;
    width?: DimensionValue;
    icon?: ReactElement<any, any>;
    justifyContent?:
        | 'center'
        | 'flex-start'
        | 'flex-end'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
        | undefined;
}

const { width } = Dimensions.get('window');

const Header: React.FC<HeaderProps> = ({
    title,
    icon,
    flexDirection = 'row',
    gap,
    justifyContent = 'center',
    width,
}) => {
    const styles = StyleSheet.create({
        header: {
            backgroundColor: 'rgba(220, 220, 220, 0)',
            height: 90,
            width,
            position: 'absolute',
            alignSelf: 'center',
            justifyContent,
        },
        title: {
            width: '100%',
            flexDirection,
            gap,
            alignItems: 'center',
            alignContent: 'center',
            height: '100%',
        },
        textTitle: {
            fontSize: 25,
            fontWeight: '700',
            paddingLeft: 20,
        },
    });

    return (
        <View style={styles.header}>
            <View style={styles.title}>
                {icon}
                <Text style={styles.textTitle}>{title}</Text>
            </View>
        </View>
    );
};

export default Header;
