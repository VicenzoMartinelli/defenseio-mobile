import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Layout, Text } from 'react-native-ui-kitten';
import React, { useState } from 'react';

import { Input } from 'react-native-ui-kitten';
import { ScrollView } from 'react-native-gesture-handler';
import { Spinner } from 'react-native-ui-kitten';
import { Formik } from 'formik';
import * as yup from 'yup';
import validCpf from '../../utils/validators/validCpf';
import InlineDatePicker from '../../components/InlineDatePicker';

export default SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    documentIdentifier: yup.string().required('Cpf obrigatório').test(
      'valid-cpf',
      'Cpf inválido',
      (val) => validCpf(val)
    ),
    rg: yup.string().required('Rg obrigatório'),
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('Email obrigatório').email('Email inválido'),
    phoneNumber: yup.string().required('Telefone obrigatório').min(9, 'Telefone inválido'),
    password: yup.string()
      .required("Senha obrigatória")
      .min(6, "Senha inválida")
      .oneOf([yup.ref("confirmPassword")], "As senhas não conferem"),
  })

  const initial = navigation.state.params || {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    documentIdentifier: "",
    rg: "",
    birthDate: new Date(),
    kiloMetersSearchRadius: 0,
    longitude: 0,
    latitude: 0,
    cep: "",
    address: "",
    addressNumber: "",
    complement: "",
    burgh: "",
    cityId: "",
    city: ""
  }

  return (
    <Layout style={styles.container} >
      <KeyboardAvoidingView behavior="height" style={{ width: '100%', height: '100%' }}>
        <ScrollView style={{ minHeight: '100%' }} >
          <Text style={styles.text} status="primary" category="h5">Precisamos de algumas infos</Text>
          <Formik
            initialValues={initial}
            validationSchema={schema}
            onSubmit={values => {
              navigation.navigate('SignUpAddress', values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, setFieldValue }) => (
              <>
                <Input
                  placeholder='Seu CPF'
                  onChangeText={handleChange('documentIdentifier')}
                  onBlur={handleBlur('documentIdentifier')}
                  value={values.documentIdentifier}
                  status={errors.documentIdentifier ? 'danger' : 'success'}
                  caption={errors.documentIdentifier || ''}
                  disabled={isSubmitting}
                  keyboardType="number-pad"
                  style={styles.input}
                />
                <InlineDatePicker
                  placeholder='Data de nascimento'
                  formikValues={values}
                  value={'birthDate'}
                  status={errors.birthDate ? 'danger' : 'success'}
                  caption={errors.birthDate || ''}
                  setFieldValue={setFieldValue}
                />
                <Input
                  placeholder='Seu nome'
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  status={errors.name ? 'danger' : 'success'}
                  caption={errors.name || ''}
                  value={values.name}
                  disabled={isSubmitting}
                  keyboardType="default"
                  style={styles.input}
                />
                <Input
                  placeholder='Seu rg'
                  onChangeText={handleChange('rg')}
                  onBlur={handleBlur('rg')}
                  status={errors.rg ? 'danger' : 'success'}
                  caption={errors.rg || ''}
                  value={values.rg}
                  disabled={isSubmitting}
                  keyboardType="default"
                  style={styles.input}
                />
                <Input
                  placeholder='Seu email'
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  status={errors.email ? 'danger' : 'success'}
                  caption={errors.email || ''}
                  value={values.email}
                  disabled={isSubmitting}
                  keyboardType="email-address"
                  style={styles.input}
                />
                <Input
                  placeholder='Seu telefone'
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  status={errors.phoneNumber ? 'danger' : 'success'}
                  caption={errors.phoneNumber || ''}
                  value={values.phoneNumber}
                  disabled={isSubmitting}
                  keyboardType="phone-pad"
                  style={styles.input}
                />
                <Input
                  placeholder='Sua senha'
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  status={errors.password ? 'danger' : 'success'}
                  caption={errors.password || ''}
                  value={values.password}
                  disabled={loading}
                  secureTextEntry={true}
                  style={styles.input}
                />
                <Input
                  placeholder='Confirme a senha'
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  status={errors.confirmPassword ? 'danger' : 'success'}
                  caption={errors.confirmPassword || ''}
                  value={values.confirmPassword}
                  disabled={loading}
                  secureTextEntry={true}
                  style={styles.input}
                />

                <Button status="primary" style={styles.inputButton} disabled={loading} onPress={handleSubmit}>Continuar {loading && <Spinner status="primary" />}</Button>
              </>
            )}
          </Formik>
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
  dateInput: {

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
