import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, List, ListItem, Icon, Button } from 'react-native-ui-kitten';
import theme from '../../../theme/theme';
import { textStyle } from '../../../theme/textStyles';
import { useAsync } from 'react-async';
import { findCreatedSolicicitations, findOpenedSolicitations } from '../../../services/api';
import { PacmanIndicator } from 'react-native-indicators';
import { modalityTypes } from '../../../utils/enums/modalityTypes';
import { toBRDate } from '../../../utils/converters/date';

const SolicitationList = ({ navigation }) => {

    const inProgressList = navigation.state.params.type === 2;
    console.log(navigation.state.params.type)
    const [solicitations, setSolicitations] = useState([])

    const { data, isResolved, isLoading, reload } = useAsync({
        promiseFn: inProgressList ? findOpenedSolicitations : findCreatedSolicicitations
    });

    const CheckIcon = (style) => (
        <Icon {...style} fill={theme["color-primary-500"]} name='checkmark-outline' />
    );

    const ChatIcon = (style) => (
        <Icon {...style} fill={theme["color-primary-500"]} name='message-circle-outline' />
    );

    const renderItem = ({ index, item }) => {

        const handleFinish = () => {
            navigation.navigate('FinishSolicitation', {
                id: item.id
            });
        }

        const handleOpenChat = () => {
            navigation.navigate('SolicitationChat', {
                id: item.provider.id,
                providerName: item.provider.name
            });
        }

        return (
            <ListItem style={styles.itemContainer}>
                <View style={styles.fullWidth}>
                    <Text
                        style={[styles.subtitle, styles.center, styles.lineFlex]}
                        status="primary"
                        category='s1'>
                        {item.provider.name}
                    </Text>
                    <View style={styles.lineFlex}>
                        <Text
                            appearance='hint'
                            style={[textStyle.paragraph, styles.center]}
                            category='p2'>
                            {modalityTypes[item.modalityType]}
                        </Text>
                        <Text
                            style={[textStyle.bolder, styles.value]}
                            category='p1'
                        >
                            {'R$ ' + item.finalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </Text>
                    </View>
                    <View style={styles.lineFlex}>
                        <View style={styles.column}>
                            <Icon name="calendar-outline" fill={theme['color-primary-500']} height={24} width={24} />
                            <Text appearance='hint'>{toBRDate(new Date(item.startDateTime))}</Text>
                        </View>
                        <View style={[styles.column, styles.contentEnd]}>
                            <Text appearance='hint'>{item.turnStart}</Text>
                            <Icon name="clock-outline" fill={theme['color-primary-500']} height={24} width={24} />
                        </View>
                    </View>
                    {inProgressList &&
                        <View style={styles.actionsContainer}>
                            <Button
                                status="primary"
                                appearance="outline"
                                style={styles.actions}
                                icon={CheckIcon}
                                onPress={handleFinish}>Encerrar</Button>
                            <Button
                                status="primary"
                                appearance="outline"
                                style={styles.actions}
                                icon={ChatIcon}
                                onPress={handleOpenChat} />
                        </View>}
                </View>
            </ListItem>);
    }

    useEffect(() => {
        if (isResolved) {
            setSolicitations(data);
        }
    }, [data]);

    return (
        <Layout style={{ flex: 1, backgroundColor: '#1a2138', padding: 20 }} theme={theme}>
            <View style={styles.container}>
                <Text category="h5" status="primary" style={styles.text}>{"Solicitações " + (inProgressList ? "em andamento" : "em aprovação")}</Text>
                {isLoading && <PacmanIndicator color={theme["color-primary-500"]} />}

                <List
                    numColumns={1}
                    renderItem={renderItem}
                    data={solicitations}
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
        marginVertical: 5,
        width: '100%'
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
    lineFlex: {
        paddingVertical: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    column: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    contentEnd: {
        justifyContent: 'flex-end'
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    actions: {
        borderRadius: 30,
        marginRight: 10
    }
});

export default SolicitationList;
