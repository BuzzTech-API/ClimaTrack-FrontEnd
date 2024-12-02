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
            backgroundColor: 'rgba(255, 255, 255, 1)',
            height: 80,
            width:'100%',
            alignItems:'center',
            position: 'absolute',
            alignSelf: 'center',
            justifyContent,
            zIndex:1,
        },
        title: {
            width: 'auto',
            flexDirection,
            gap,
            alignItems: 'center',
            alignContent: 'center',
            height: '100%',
            paddingTop:20
            
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
