import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Input, Divider, Button } from 'react-native-ui-kitten';
import theme from '../../theme/theme';
import { logout } from '../../services/auth';

const Configs = ({ navigation }) => {
    return (
        <Layout style={styles.layout} theme={theme}>
            <View style={styles.container}>
                <Text category="h5" status="primary" style={styles.text}>Configurações</Text>

                <View style={styles.line}>
                    <Text style={styles.label}>Raio da busca para serviços (KMs)</Text>
                    <Input style={styles.input} keyboardType="numeric" />
                </View>
                <Button status="primary">Salvar</Button>

                <Divider style={{ height: 3, marginTop: 100, marginBottom: 10, backgroundColor: theme["color-danger-600"] }} />

                <Button onPress={() => {
                    logout().then(() => {
                        navigation.navigate('AuthStack');
                    });
                }} status="danger">Encerrar a sessão</Button>
            </View>
        </Layout>
    );
}
const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: '#1a2138',
        padding: 20
    },
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
    label: {
        color: "#e2e2e2",
        textAlign: 'left'
    },
    input: {
        borderColor: theme["color-primary-500"]
    }
});

export default Configs;
