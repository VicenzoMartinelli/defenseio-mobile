import React from 'react';
import { Dimensions } from 'react-native';
import {
    withStyles
} from 'react-native-ui-kitten/theme';
import {
    List
} from 'react-native-ui-kitten';
import MenuListItem from '../MenuListItem';

const { width } = Dimensions.get('window');

const MenuListComponent = (props) => {
    const { onItemPress: onPress, style, themedStyle, ...restProps } = props;

    const onItemPress = (index) => {
        onPress(index);
    };

    const renderItem = (info) => {
        return (
            <MenuListItem
                style={themedStyle.item}
                data={info.item}
                onPress={onItemPress}
            />
        );
    };

    return (
        <List
            numColumns={1}
            renderItem={renderItem}
            {...restProps}
        />
    );
};

const MenuList = withStyles(MenuListComponent, (theme) => ({
    item: {
        flex: 1,
        marginVertical: 8,
        maxWidth: width - 32,
        marginHorizontal: 16,
    },
}));

export default MenuList;