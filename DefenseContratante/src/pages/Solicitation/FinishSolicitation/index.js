import { Alert, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Layout, Text } from 'react-native-ui-kitten';
import React, { useState } from 'react';

import { Input } from 'react-native-ui-kitten';
import { ScrollView } from 'react-native-gesture-handler';
import { Spinner } from 'react-native-ui-kitten';
import { finishSolicitation, checkProfanity } from '../../../services/api';
import { useFormik } from 'formik';
import { ToastAndroid } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import theme from '../../../theme/theme';
import { PacmanIndicator } from 'react-native-indicators';

const FinishSolicitation = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const { values, handleChange, handleSubmit, handleBlur, isSubmitting, setFieldValue } = useFormik({
        initialValues: {
            id: navigation.state.params.id,
            efficiencyGrade: -1,
            experienceGrade: -1,
            speedGrade: -1,
            comment: ''
        },
        onSubmit: handleFinish
    });

    function handleFinish() {
        setLoading(true);

        checkProfanity(values.comment)
            .then((r) => {
                if (!r) {
                    Alert.alert('Atenção', "Seu comentário nos pareceu agressivo ou ofensivo, por favor verifique");
                    setLoading(false);
                    return;
                }

                finishSolicitation(values)
                    .then(res => {
                        setLoading(false);

                        if (res.success !== undefined && !res.success) {
                            Alert.alert('Atenção', res.msg);
                            return;
                        }

                        ToastAndroid.show('Solicitação finalizada com sucesso!', ToastAndroid.SHORT);
                        setTimeout(() => navigation.goBack(), 1500);
                    })
                    .catch(err => {
                        setLoading(false);
                        Alert.alert('Atenção', err);
                    });
            })
            .catch(err => {
                setLoading(false);
                Alert.alert('Atenção', err);
            });
    }

    return (
        <Layout style={styles.container} >
            <KeyboardAvoidingView keyboardVerticalOffset={70} behavior="height" geocode style={{ width: '100%', height: '100%' }}>
                <ScrollView style={{ minHeight: '100%' }} >
                    <Text style={styles.text} status="primary" category="h5">Por favor nos deixe sua avaliação</Text>
                    <>
                        {loading &&
                            <View style={styles.lineContainer}>
                                <PacmanIndicator color={theme["color-primary-500"]} />
                            </View>
                        }
                        <View style={styles.lineContainer}>
                            <Text style={styles.label}>Velocidade e agilidade do serviço</Text>
                            <AirbnbRating
                                count={5}
                                defaultRating={values.speedGrade}
                                size={25}
                                showRating={false}
                                selectedColor={theme["color-primary-500"]}
                                onFinishRating={(e) => setFieldValue('speedGrade', e)}
                            />
                        </View>

                        <View style={styles.lineContainer}>
                            <Text style={styles.label}>Eficiência do serviço</Text>
                            <AirbnbRating
                                count={5}
                                defaultRating={values.efficiencyGrade}
                                size={25}
                                showRating={false}
                                selectedColor={theme["color-primary-500"]}
                                onFinishRating={(e) => setFieldValue('efficiencyGrade', e)}
                            />
                        </View>

                        <View style={styles.lineContainer}>
                            <Text style={styles.label}>Uma nota para a experiência como um todo</Text>
                            <AirbnbRating
                                count={5}
                                defaultRating={values.experienceGrade}
                                size={25}
                                showRating={false}
                                selectedColor={theme["color-primary-500"]}
                                onFinishRating={(e) => setFieldValue('experienceGrade', e)}
                            />
                        </View>

                        <View style={styles.lineContainer}>
                            <Text style={styles.label}>Deixe um comentário</Text>
                            <Input
                                onChangeText={handleChange('comment')}
                                onBlur={handleBlur('comment')}
                                value={values.comment}
                                multiline={true}
                                numberOfLines={3}
                                disabled={isSubmitting}
                                style={styles.input}
                            />
                        </View>

                        <Button
                            status="primary"
                            style={styles.inputButton}
                            disabled={loading}
                            onPress={handleSubmit}> {loading && <Spinner size="tiny" status="primary" />} Finalizar</Button>
                    </>
                </ScrollView>
            </KeyboardAvoidingView >
        </Layout>
    )
}

const styles = StyleSheet.create({
    main: { flex: 1, backgroundColor: '#1a2138' },
    label: {
        color: "#e2e2e2",
        textAlign: 'left'
    },
    container: {
        flex: 1,
        padding: 15,
        alignContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        marginVertical: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    background: {
        zIndex: -1,
        opacity: 1
    },
    input: {
        marginTop: 10,
        width: '100%'
    },
    inputButton: {
        marginTop: 10,
        marginRight: 100,
        width: '100%',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loader: {
        flex: 1,
        backgroundColor: 'white',
        height: 400,
        width: '100%',
        position: 'absolute',
        top: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicator: {
        height: 5,
        width: 5
    },
    lineContainer: {
        marginTop: 20
    }
});
export default FinishSolicitation;
