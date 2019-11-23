import React from 'react';
import { View } from 'react-native';
import {
    ListItem,
    Text,
    Icon,
} from 'react-native-ui-kitten';
import {
    withStyles,
} from 'react-native-ui-kitten/theme';
import { textStyle } from '../../theme/textStyles';
import theme from '../../theme/theme';

const MenuListItemComponent = (props) => {
    const { themedStyle, style, data, ...restProps } = props;

    return (
        <ListItem
            style={[themedStyle.container, style]}
            {...restProps}>
            <Icon
                style={themedStyle.image}
                width={32} height={32} fill={theme['color-primary-500']}
                name={data.iconName}
            />
            <View style={themedStyle.detailsContainer}>
                <Text
                    style={[textStyle.subtitle, themedStyle.center]}
                    status="primary"
                    category='s1'>
                    {data.title}
                </Text>
                {data.description && <Text
                    appearance='hint'
                    style={[textStyle.paragraph, themedStyle.center]}
                    category='p2'>
                    {data.description}
                </Text>
                }
            </View>
        </ListItem>
    );
};

const MenuListItem = withStyles(MenuListItemComponent, (theme) => ({
    container: {
        flexDirection: 'column',
        borderRadius: 16,
        paddingHorizontal: 0,
        paddingVertical: 0,
        overflow: 'hidden',
    },
    detailsContainer: {
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    image: {
        marginTop: 10,
        flex: 1,
        height: 60
    },
    center: {
        textAlign: 'center'
    }
}));

export default MenuListItem;