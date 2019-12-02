import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, List, ListItem, Icon, Button } from 'react-native-ui-kitten';
import theme from '../../../theme/theme';
import bilingMethods from '../../../utils/enums/bilingMethods';
import { textStyle } from '../../../theme/textStyles';
import { useAsync } from 'react-async';
import { findAttendedModalityProviders } from '../../../services/api';

const SelectProvider = ({ navigation }) => {

    const { type } = navigation.state.params;

    const [attendedModalities, setAttendedModalities] = useState([])

    const { data, isResolved } = useAsync({
        promiseFn: findAttendedModalityProviders,
        modalityType: type
    });

    const handleItemPress = (item) => {
        navigation.navigate('SelectLocalization', {
            type,
            ...item
        });
    }

    const renderItem = ({ index, item }) => {
        return (
            <ListItem style={styles.itemContainer} onPress={() => handleItemPress(item)}>
                <View style={styles.fullWidth}>
                    <Text
                        style={[styles.subtitle, styles.center]}
                        status="primary"
                        category='s1'>
                        {item.providerName}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <Text
                            appearance='hint'
                            style={[textStyle.paragraph, styles.center]}
                            category='p2'>
                            {bilingMethods[item.method]}
                        </Text>
                        <Text
                            style={[textStyle.bolder, styles.value]}
                            category='p1'
                        >
                            {'R$ ' + item.basicValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={styles.rateContainer}>
                            {Array.from(Array(item.providerRate).keys()).map((x, index) => <Icon
                                key={x}
                                width={20} height={20} fill={theme['color-primary-500']}
                                name="star"
                            />)}

                            {Array.from(Array(5 - item.providerRate).keys()).map((x, index) => <Icon
                                key={index}
                                width={20} height={20} fill={theme['color-primary-500']}
                                name="star-outline"
                            />)}
                        </View>
                        <Button
                            status="primary"
                            appearance="ghost"
                            style={styles.actions}
                            size="small"
                            onPress={() => {
                                navigation.navigate('ListComments', {
                                    id: item.providerUserId
                                });
                            }}>ver comentários</Button>
                    </View>
                </View>
            </ListItem >);
    }

    useEffect(() => {
        if (isResolved) {
            setAttendedModalities(data);
        }
    }, [data]);

    return (
        <Layout style={{ flex: 1, backgroundColor: '#1a2138', padding: 20 }} theme={theme}>
            <View style={styles.container}>
                <Text category="h5" status="primary" style={styles.text}>Selecione um prestador</Text>

                <List
                    numColumns={1}
                    renderItem={renderItem}
                    data={attendedModalities}
                />
            </View>
        </Layout>
    );
}
const styles = StyleSheet.create({
    fullWidth: {
        width: '100%'
    },
    container: {
        flexDirection: 'column',
        flex: 1
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
    detailsContainer: {
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    rateContainer: {
        flexDirection: 'row',
        alignContent: 'flex-start',
        alignItems: 'center'
    },
    value: {
        textAlign: 'right'
    },
    actions: {
        alignSelf: 'flex-end',
        textAlign: 'right',
        paddingRight: 0,
        position: 'absolute',
        right: '-4%',
        top: '-25%'
    }
});

export default SelectProvider;
