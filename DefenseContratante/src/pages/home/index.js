import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Divider } from 'react-native-ui-kitten';
import MenuList from '../../components/MenuList';
import theme from '../../theme/theme';
import { logout } from '../../services/auth';
import { options } from '../../utils/enums/menuOptions';

const opts = [{
  key: 1,
  title: 'Em aprovação',
  iconName: 'pause-circle-outline'
}, {
  key: 2,
  title: 'Em andamento',
  iconName: 'checkmark-circle-outline'
}]

const Home = ({ navigation }) => {
  return (
    <Layout style={{ flex: 1, backgroundColor: '#1a2138', padding: 20 }} theme={theme}>
      <View style={styles.container}>
        <Text category="h6" status="primary" style={styles.text}>Qual serviço deseja contratar?</Text>

        <MenuList
          data={options}
          numColumns={2}
          onItemPress={(index) => {
            navigation.navigate('SelectProvider', {
              type: options[index].key
            })
          }}
        />

        <Divider style={{ height: 3, marginVertical: 15, backgroundColor: theme["color-primary-500"] }} />
        <Text category="h6" status="primary" style={styles.text}>Suas solicitações</Text>

        <MenuList
          data={opts}
          numColumns={2}
          onItemPress={(index) => {
            const key = opts[index].key;

            navigation.navigate('SolicitationList', {
              type: key
            });
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
