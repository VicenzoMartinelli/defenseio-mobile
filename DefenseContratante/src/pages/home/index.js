import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import MenuList from '../../components/MenuList';
import theme from '../../theme/theme';
import { logout } from '../../services/auth';

const Home = ({ navigation }) => {
  const options = [{
    key: 1,
    title: 'Pessoal',
    description: 'Segurança para você',
    iconName: 'people-outline'
  }, {
    key: 4,
    title: 'Patrimonial',
    description: 'Para propriedades privadas',
    iconName: 'home-outline'
  }, {
    key: 3,
    title: 'Transporte',
    description: 'Para transporte de valores',
    iconName: 'car-outline'
  }, {
    key: 2,
    title: 'Escolta armada',
    description: 'Para transporte armado',
    iconName: 'car'
  }];

  return (
    <Layout style={{ flex: 1, backgroundColor: '#1a2138', padding: 20 }} theme={theme}>
      <View style={styles.container}>
        <Text category="h5" status="primary" style={styles.text}>Qual serviço deseja contratar?</Text>

        <MenuList
          data={options}
          onItemPress={(index) => {
            navigation.navigate('SelectProvider', {
              type: options[index].key
            })
          }}
        />
      </View>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
    width: '100%'
  },
});

export default Home;
