import React from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import {getLocation} from './src/helpers/location';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Get" onPress={getLocation} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
