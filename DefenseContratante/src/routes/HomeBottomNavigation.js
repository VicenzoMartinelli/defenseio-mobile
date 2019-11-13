import React, { useState } from 'react';
import { Icon, BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten';
import { Image, SvgXml } from 'react-native-svg';
import svgAssets from '../assets/svg-assets';

const HomeNavigation = (props) => {

    const MessagesIcon = (style) => (
        <Icon {...style} name='message-circle-outline' />
    );

    const SettingsIcon = (style) => (
        <Icon {...style} name='settings' />
    );

    const HomeIcon = (style) => (
        <SvgXml xml={svgAssets.Logo} style={{ position: 'absolute', top: -20 }}
            width={70} height={60} />
    );
    const onTabSelect = (indexNadave) => {
        const { [indexNadave]: selectedRoute } = props.navigation.state.routes;
        props.navigation.navigate(selectedRoute.routeName);
    };
    return (
        <BottomNavigation
            selectedIndex={props.navigation.state.index}
            appearance="noIndicator"
            onSelect={onTabSelect}>
            <BottomNavigationTab
                title='Configurações'
                icon={SettingsIcon}
            />
            <BottomNavigationTab
                icon={HomeIcon}
            />
            <BottomNavigationTab
                title='Negociações'
                icon={MessagesIcon}
            />
        </BottomNavigation>
    );
}

export default HomeNavigation;