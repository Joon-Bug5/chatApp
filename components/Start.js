import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class Start extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello Start Screen!</Text>
        <Button
          title="Go to Chat"
          onPress={() => this.props.navigation.navigate('Chat')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1: {
    flex:10,
    backgroundColor: 'blue'
  },
  box2: {
    flex:120,
    backgroundColor: 'red'
  },
  box3: {
    flex:50,
    backgroundColor: 'green'
  }
});