import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, List, ListItem, Icon, Button, Input } from 'react-native-ui-kitten';
import theme from '../../../theme/theme';
import { textStyle } from '../../../theme/textStyles';
import { useAsync } from 'react-async';
import { PacmanIndicator } from 'react-native-indicators';
import { findMessagesFromUser, buildHubConnection } from '../../../services/api-chat';
import { HubConnection, HubConnectionState } from '@aspnet/signalr';

const SolicitationChat = ({ navigation }) => {
    const { id } = navigation.state.params;
    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState('');
    const [hubConnect, setHubConnect] = useState(undefined);

    const { data, isResolved, isLoading, reload } = useAsync({
        promiseFn: findMessagesFromUser,
        userId: id
    });

    const SendIcon = (style) => (
        <Icon {...style} fill={theme["color-primary-500"]} name='paper-plane-outline' />
    );

    const handleSend = () => {
        const msg = {
            providerId: id,
            isProviderSend: false,
            isAttachment: false,
            content: currentMessage
        };

        setCurrentMessage('');
        setMessages([...messages, msg]);
        hubConnect.invoke('sendChatMessage', msg);
    }

    const handleReceiveMessage = (data) => {
        console.log('1')
        setMessages(lastMsgs => {
            return [...lastMsgs, data];
        });
    }

    const renderItem = ({ item }) => {

        const sendedProvider = item.isProviderSend;
        return (
            <ListItem key={item.id} style={[styles.itemContainer, { alignSelf: (sendedProvider ? "flex-start" : "flex-end") }]}>
                <View style={[styles.lineFlex]}>
                    <Text
                        style={[textStyle.paragraph,
                        {
                            fontWeight: 'bold',
                            paddingHorizontal: 5,
                            color: (sendedProvider ? "#e2e2e2" : theme["color-primary-500"]),
                            textAlign: (sendedProvider ? "left" : "right")
                        }]}
                        category='p2'>
                        {item.content}
                    </Text>
                </View>
            </ListItem>);
    }

    useEffect(() => {
        if (isResolved) {
            setMessages(data);
        }
    }, [data]);

    useEffect(() => {
        async function createHub() {
            const hb = await buildHubConnection();

            try {
                await hb.start();

                setHubConnect(hb);
            }
            catch (err) {
                console.log(err)
            }
        }

        createHub();
    }, []);

    useEffect(() => {
        console.log('rub', hubConnect)

        if (hubConnect && hubConnect.state === HubConnectionState.Connected) {
            console.log(hubConnect)
            hubConnect.on('receiveChatMessage', (data) => handleReceiveMessage(data));
        }
    }, [hubConnect]);

    return (
        <Layout style={{ flex: 1, backgroundColor: '#1a2138', flexDirection: 'column' }} theme={theme}>
            <View style={styles.container}>
                {isLoading && <PacmanIndicator color={theme["color-primary-500"]} />}

                <List
                    numColumns={1}
                    renderItem={renderItem}
                    data={messages}
                />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Digite sua mensagem'
                    onChangeText={setCurrentMessage}
                    value={currentMessage}
                    style={styles.inputMessage}
                />
                <Button
                    status="primary"
                    appearance="outline"
                    style={styles.action}
                    icon={SendIcon}
                    onPress={handleSend} />
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
        flex: 1,
        padding: 20,
    },
    itemContainer: {
        flexDirection: 'column',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 5
    },
    lineFlex: {
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentEnd: {
        justifyContent: 'flex-end'
    },
    action: {
        height: '95%',
        width: '20%',
        alignSelf: 'flex-start',
        backgroundColor: '#222b45'
    },
    inputMessage: {
        width: '80%',
        borderColor: theme["color-primary-500"],
        backgroundColor: '#222b45'
    },
    inputContainer: {
        height: 70,
        marginBottom: 15,
        zIndex: 200,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default SolicitationChat;
