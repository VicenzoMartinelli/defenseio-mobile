import { Alert, KeyboardAvoidingView, StyleSheet, View, PermissionsAndroid } from 'react-native';
import { Button, Layout, Text } from 'react-native-ui-kitten';
import React, { useState, useEffect, useContext } from 'react';

import { Input } from 'react-native-ui-kitten';
import { ScrollView } from 'react-native-gesture-handler';
import { Spinner } from 'react-native-ui-kitten';
import { login, findCityIdByName, registerUser } from '../../services/api';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import Geolocation from '@react-native-community/geolocation';
import { GeocodeContext } from '../../providers/GeocodeProvider';
import { ToastAndroid } from 'react-native';

Geolocation.setRNConfiguration({
  authorizationLevel: 'always',
  skipPermissionRequests: false
});

export default SignUp = ({ navigation }) => {
  const initial = navigation.state.params;

  const [loading, setLoading] = useState(false);

  const geocode = useContext(GeocodeContext);

  const { values, errors, handleChange, handleSubmit, handleBlur, isSubmitting, setFieldValue } = useFormik({
    initialValues: initial,
    onSubmit: handleRegister,
    validationSchema: yup.object({
      cep: yup.string().required("Informe o cep"),
      address: yup.string().required("Informe o endereço"),
      addressNumber: yup.string().required("Informe o número do endereço"),
      complement: yup.string(),
      burgh: yup.string().required("Informe o bairro"),
      cityId: yup.string().required("Informe a cidade")
    })
  });

  function handleRegister() {
    setLoading(true);

    registerUser(values)
      .then(res => {
        setLoading(false);

        if (res.success !== undefined && !res.success) {
          Alert.alert('Atenção', res.msg);
          return;
        }

        ToastAndroid.show('Cadastro efetuado com sucesso!', ToastAndroid.SHORT);
        setTimeout(() => navigation.navigate('SignIn'), 3000);
      })
      .catch(err => {
        setLoading(false);
        Alert.alert('Atenção', err);
      });

  }

  async function extractGeocodeResults(locations) {
    for (let index = 0; index < locations.length; index++) {
      const element = locations[index];

      if (element.types[0] === "street_number") {
        setFieldValue('addressNumber', element.long_name);
      }
      else if (element.types[0] === "route") {
        setFieldValue('address', element.long_name);
      }
      else if (element.types[0] === "administrative_area_level_2") {
        setFieldValue('city', element.long_name);

        var cityId = await findCityIdByName(element.long_name);

        setFieldValue('cityId', cityId);
      }
      else if (element.types[0] === "postal_code") {
        setFieldValue('cep', element.long_name);
      }
      else if (element.types[0] === "political") {
        setFieldValue('burgh', element.long_name);
      }
    }
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
        setLoading(true);

        Geolocation.getCurrentPosition(location => {

          const { latitude, longitude } = location.coords;

          setFieldValue('latitude', latitude);
          setFieldValue('longitude', longitude);

          geocode
            .fromLatLng(latitude, longitude)
            .then(response => {
              try {
                setLoading(false);

                console.log(response.results[0]);

                extractGeocodeResults(response.results[0].address_components);
              } catch {
                Alert.alert('Não foi possível determinar sua localização');
              }
            })
            .catch(() => {
              Alert.alert('Não foi possível determinar sua localização');
            });
        }, () => {
          Alert.alert('Opa :(', 'Não foi possível recuperar sua localização');
        },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
      }
    }
    requestPermissions();
  }, [])

  return (
    <Layout style={styles.container} >
      <KeyboardAvoidingView behavior="height" style={{ width: '100%', height: '100%' }}>
        <ScrollView style={{ minHeight: '100%' }} >
          <Text style={styles.text} status="primary" category="h5">Está tudo correto?</Text>
          <>
            <Input
              placeholder='Cidade'
              value={values.city}
              disabled={true}
              style={styles.input}
            />

            <Input
              placeholder='Bairro'
              onChangeText={handleChange('burgh')}
              onBlur={handleBlur('burgh')}
              value={values.burgh}
              status={errors.burgh ? 'danger' : 'success'}
              caption={errors.burgh || ''}
              disabled={isSubmitting}
              style={styles.input}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Input
                placeholder='Endereço'
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
                status={errors.address ? 'danger' : 'success'}
                caption={errors.address || ''}
                disabled={isSubmitting}
                style={styles.inputAddress}
              />

              <Input
                placeholder='Nº'
                onChangeText={handleChange('addressNumber')}
                onBlur={handleBlur('addressNumber')}
                value={values.addressNumber}
                status={errors.addressNumber ? 'danger' : 'success'}
                caption={errors.addressNumber || ''}
                disabled={isSubmitting}
                style={styles.inputAddress}
              />
            </View>



            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Input
                placeholder='CEP'
                onChangeText={handleChange('cep')}
                onBlur={handleBlur('cep')}
                value={values.cep}
                status={errors.cep ? 'danger' : 'success'}
                caption={errors.cep || ''}
                disabled={isSubmitting}
                style={styles.inputAddress}
              />

              <Input
                placeholder='Comp.'
                onChangeText={handleChange('complement')}
                onBlur={handleBlur('complement')}
                value={values.complement}
                status={errors.complement ? 'danger' : 'success'}
                caption={errors.complement || ''}
                disabled={isSubmitting}
                style={styles.inputAddress}
              />
            </View>

            <Button status="primary" style={styles.inputButton} disabled={loading} onPress={handleSubmit}> {loading && <Spinner size="tiny" status="primary" />} Finalizar</Button>
          </>
        </ScrollView>
      </KeyboardAvoidingView >
    </Layout>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1
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
  inputAddress: {
    marginTop: 10,
    width: '70%',
  },
  inputAddressNumber: {
    width: '25%',
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
  }
});
