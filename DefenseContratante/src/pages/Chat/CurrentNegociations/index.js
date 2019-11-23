import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, List, ListItem, Icon } from 'react-native-ui-kitten';
import theme from '../../../theme/theme';
import bilingMethods from '../../../utils/enums/bilingMethods';
import { textStyle } from '../../../theme/textStyles';
import { useAsync } from 'react-async';
import { findNegociations } from '../../../services/api-chat';

const CurrentNegociations = ({ navigation }) => {
    const [negociations, setNegociations] = useState([])

    const { data, isResolved, reload } = useAsync({
        promiseFn: findNegociations
    });

    const handleItemPress = (item) => {
        navigation.navigate('SolicitationChat', {
            id: item.userId,
        });
    }

    const renderItem = ({ index, item }) => {
        return (
            <ListItem style={styles.itemContainer} onPress={() => handleItemPress(item)}>
                <View style={styles.fullWidth}>
                    <Text
                        style={[styles.subtitle]}
                        status="primary"
                        category='s1'>
                        {item.userName}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            appearance='hint'
                            style={[textStyle.paragraph, styles.center]}
                            category='p2'>
                            {item.content}
                        </Text>
                    </View>
                </View>
            </ListItem>);
    }

    useEffect(() => {
        if (isResolved) {
            setNegociations(data);
        }
    }, [data]);

    return (
        <Layout style={{ flex: 1, backgroundColor: '#1a2138', padding: 20 }} theme={theme}>
            <View style={styles.container}>
                <Text category="h5" status="primary" style={styles.text}>Negociações atuais</Text>

                <List
                    numColumns={1}
                    renderItem={renderItem}
                    data={negociations}
                />
            </View>
        </Layout>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
    },
    fullWidth: {
        width: '100%'
    },
    text: {
        textAlign: 'center',
        marginBottom: 20,
        width: '100%'
    },
    listItem: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    itemContainer: {
        flexDirection: 'column',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '100%',
        marginVertical: 5,
    },
});

export default CurrentNegociations;
