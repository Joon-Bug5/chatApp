import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Chat extends React.Component {
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name});
    let bgColor = this.props.route.params.bgColor;

    return (
      <View style={styles.container}>
        <View style={{...styles.container, backgroundColor: bgColor}}>
        <Text style={styles.text}>Hello Chat!</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
     flex:1,
     height: '100%',
     width: '100%',
     justifyContent: 'center', 
     alignItems: 'center',
  },

  text: {
    color: '#fff',
  }
  
}) 