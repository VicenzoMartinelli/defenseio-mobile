import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Alert, Dimensions } from 'react-native';
import { Button, Layout, Text } from 'react-native-ui-kitten';
import { Input } from 'react-native-ui-kitten';
import { SvgXml } from 'react-native-svg';
import SvgAssets from '../../../assets/svg-assets';
import { ScrollView } from 'react-native-gesture-handler';
import { login } from '../../../services/api';
import { Spinner } from 'react-native-ui-kitten';
import styles from './styles';
import { loggedIn } from '../../../services/auth';

const Login = ({ navigation }) => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function isLoggedIn() {
      const logg = await loggedIn();
      console.log('logado:', logg);

      if (logg) {
        navigation.navigate('App');
      }
    }

    isLoggedIn();
  }, []);

  function handleLogin() {
    setLoading(true);

    login(cpf, password)
      .then(res => {
        setLoading(false);

        if (res.success !== undefined && !res.success) {
          Alert.alert('Atenção', res.msg);
          return;
        }

        navigation.navigate('App');
      })
      .catch(err => {
        setLoading(false);
        Alert.alert('Atenção', 'Não foi possível realizar o login');
      });
  }

  function handleSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    <Layout style={styles.container}>

      <Text style={styles.text} status="primary" category="label">
        Seja bem-vindo à segurança
        </Text>
      <KeyboardAvoidingView behavior="height" style={{ width: '100%', height: '100%' }}>
        <ScrollView style={{ minHeight: '100%' }} >
          <SvgXml xml={SvgAssets.HomeScreen} style={styles.background} width={Dimensions.get('screen').width} height={Dimensions.get('screen').height / 4} />
          <Text style={styles.text} status="primary" category="h5">
            Efetue seu acesso no DefenseIO
        </Text>
          <Input
            placeholder='Seu CPF'
            value={cpf}
            disabled={loading}
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={setCpf}
          />

          <Input
            placeholder='Sua senha'
            value={password}
            disabled={loading}
            secureTextEntry={true}
            style={styles.input}
            onChangeText={setPassword}
          />
          <Button status="primary" style={styles.inputButton} disabled={loading} onPress={handleLogin}> {loading && <Spinner size="tiny" status="primary" />} Entrar</Button>
          <Button status="primary" style={styles.inputButton} disabled={loading} appearance="ghost" onPress={handleSignUp}>Não possuo um cadastrro</Button>
        </ScrollView>
      </KeyboardAvoidingView >
    </Layout>
  )
}


export default Login;