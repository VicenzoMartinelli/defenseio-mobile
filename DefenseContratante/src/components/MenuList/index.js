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
    const { onItemPress: onPress, style, themedStyle, numColumns, ...restProps } = props;

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
            numColumns={numColumns}
            renderItem={renderItem}
            {...restProps}
        />
    );
};

const MenuList = withStyles(MenuListComponent, (theme) => ({
    item: {
        flex: 1,
        marginVertical: 8,
        maxWidth: width - 16,
        marginHorizontal: 5,
    },
}));

export default MenuList;