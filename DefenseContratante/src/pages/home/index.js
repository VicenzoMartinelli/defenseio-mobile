import React from 'react';
import { View, Text } from 'react-native';
import { Layout } from 'react-native-ui-kitten';

const Home = (props) => {
  return (
    <Layout style={{ flex: 1 }}>
      <View>
        <Text>Welcome home</Text>
      </View>
    </Layout>
  );
}

export default Home;
