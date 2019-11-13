import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, PermissionsAndroid, View } from 'react-native';
import { Layout, Text, Button } from 'react-native-ui-kitten';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import theme from '../../../theme/theme';
import Geolocation from '@react-native-community/geolocation';
import { distanceInKms } from '../../../services/geo';
import { StackActions } from 'react-navigation';

const SelectLocalization = ({ navigation }) => {

    const params = navigation.state.params;
    const { type } = params;

    const [reg, setReg] = useState({
        latitude: -26.22861,
        longitude: -52.67056,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
    });

    const [initial, setInitial] = useState({
        latitude: -26.22861,
        longitude: -52.67056
    });

    const [dist, setDist] = useState(0);

    const handleContinue = () => {
        navigation.push('ConfirmSolicitation', {
            ...params,
            ...reg,
            kiloMeters: dist
        });
    }

    useEffect(() => {
        async function requestPermissions() {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Atenção',
                    message: 'Precisamos acesso à sua localização',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'Ok',
                },
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(location => {

                    const { latitude: lat, longitude: lng } = location.coords;

                    setReg({
                        ...reg,
                        latitude: lat,
                        longitude: lng
                    });

                    setInitial({
                        latitude: lat,
                        longitude: lng
                    });

                    if (type !== 2 && type !== 3) {
                        console.log('1111')
                        const resetAction = StackActions.replace({
                            routeName: 'ConfirmSolicitation',
                            params: {
                                ...params,
                                ...location.coords,
                                kiloMeters: dist
                            }
                        });

                        navigation.dispatch(resetAction);
                    }
                }, () => {
                    Alert.alert('Atenção', 'Não foi possível recuperar a localização do dispositivo');
                },
                    { enableHighAccuracy: true, timeout: 20000 });
            }
        }
        requestPermissions();
    }, []);

    return (
        <Layout style={styles.main} theme={theme}>
            {(type === 2 || type === 3) &&
                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text category="h6" status="primary" style={styles.text}>Indique o local de destino</Text>
                        <Button status="primary" style={styles.btnContinue} onPress={handleContinue}>Avançar</Button>
                    </View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={reg}
                    >
                        <Marker
                            title="Ponto inicial"
                            pinColor={theme["color-info-900"]}
                            coordinate={initial}
                            onDragEnd={(e) => {
                                setReg({
                                    ...reg,
                                    ...e.nativeEvent.coordinate
                                });
                            }}
                        />
                        <Marker draggable
                            pinColor={theme["color-primary-700"]}
                            title="Destino"
                            coordinate={reg}
                            onDragEnd={(e) => {
                                setReg({
                                    ...reg,
                                    ...e.nativeEvent.coordinate
                                });
                                setDist(distanceInKms(initial.latitude, initial.longitude, e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude).toFixed(2));
                            }}
                        />
                        <Polyline
                            coordinates={[
                                initial,
                                reg
                            ]}
                            strokeColor={theme["color-primary-400"]} // fallback for when `strokeColors` is not supported by the map-provider
                            strokeColors={[
                                theme["color-primary-700"],
                                '#00000000',
                                theme["color-info-900"]
                            ]}
                            strokeWidth={3}
                        />
                    </MapView>
                    <Text status="primary" style={styles.kmIndicator}>{dist} quilômetros</Text>
                </>}
        </Layout>
    );
}

const styles = StyleSheet.create({
    main: { flex: 1, backgroundColor: '#1a2138' },
    container: {
        flex: 1
    },
    text: {
        paddingVertical: 20
    },
    map: {
        flex: 1,
        height: 400,
        width: 400,
        borderRadius: 20,
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    btnContinue: {
        alignSelf: 'flex-end',
        marginBottom: 15
    },
    kmIndicator: {
        backgroundColor: '#1a2138e0',
        position: 'absolute',
        top: '92%',
        marginHorizontal: '30%',
        width: '40%',
        textAlign: 'center',
        borderRadius: 30
    }
});
export default SelectLocalization;
