import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const backgroundImage = require('../assets/backgroundImage.png');
const usernameIcon = require('../assets/usernameIcon.png');
//background color choices
const colors = {
  color1: '#090C08',
  color2: '#474056',
  color3: '#8A95A5',
  color4: '#B9C6AE',
};

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        name: '',
        bgColor: ''
    };
}

changeBgColor = (newColor) => {
  this.setState({ bgColor: newColor });
};

//background color choices
colors = {
  color1: '#090C08',
  color2: '#474056',
  color3: '#8A95A5',
  color4: '#B9C6AE',
};

  render() {
    return (
      <ImageBackground source={backgroundImage} resizeMode='cover' style={styles.image}>

        <View style={styles.container}>

          <Text style={styles.title}>ChatApp</Text>

          <View style={styles.box1}>

          <View style={styles.input}>
          
          <Image source={usernameIcon} style={styles.usernameIcon}/>
          <TextInput style={styles.inputText} onChangeText={(name) => this.setState({name})} value={this.state.name} placeholder='Your Username' />
          </View>

          <View style={styles.colorBox}>
            <View style={styles.colorTextBox}>
            <Text style={styles.colorText}>Choose Background Color:</Text>

            <View style={styles.color}>
            <TouchableOpacity title='' color={colors.color1}  style={styles.color1} onPress={() => this.changeBgColor(colors.color1)}></TouchableOpacity>
            <TouchableOpacity style={styles.color2}  onPress={() => this.changeBgColor(colors.color2)}></TouchableOpacity>
            <TouchableOpacity TouchableOpacity style={styles.color3} onPress={() => this.changeBgColor(colors.color3)}></TouchableOpacity>
            <TouchableOpacity style={styles.color4} onPress={() => this.changeBgColor(colors.color4)}></TouchableOpacity>
            </View>
            </View>

            <View style={styles.button}>
            <TouchableOpacity style={styles.buttonHeight} onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, bgColor: this.state.bgColor } )}><Text style={styles.buttonText}>Start Chatting</Text></TouchableOpacity>
            </View>

          </View>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  box1: {
    marginBottom: 30,
    backgroundColor: "white",
    flexGrow: 1,
    flexShrink: 0,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    height: 260,
    minHeight: 260,
    maxHeight: 300,
    height: "44%",
    width: "88%"
},

  title: {
    fontSize: 45,
    fontWeight: '700',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },

  image: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  button: {
    height: 70,
    width: '88%',
    marginBottom: -15,
    marginLeft: 15,
  },

  buttonHeight: { 
    backgroundColor: '#757083',
    height: 50, 
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  input: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    height: 60,
    width: '88%',
    borderColor: '#757083',
    borderWidth: 1,
    position: 'relative',
  },

  usernameIcon: {
    padding: 10,
    margin: 20,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
    opacity: 0.5
  },

  inputText: {
    marginTop: 15,
    marginLeft: 3,
    opacity: .5,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },

  colorText: {
    color: '#757083',
    fontWeight: '300',
    fontSize: 16,
    opacity: 1,
    padding: 5,
  },

  colorTextBox: {
    alignItems: 'stretch',
    width: '88%',
    justifyContent: 'space-between',
    padding: 10,
  },

  color: { 
    width: 50,
    height: 50,
    borderRadius: 25, 
    marginRight: 10,
    marginLeft: 0,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: 0,
    alignItems: "flex-start",
    flexShrink:0,
  },

  color1: {
   backgroundColor: '#090C08',
   width: 50,
   height: 50,
   borderRadius: 25,
   borderColor:'#090C08',
  },

  color2: {
   backgroundColor: '#474056',
   width: 50,
    height: 50,
    borderRadius: 25, 
  },

 color3: {
   backgroundColor: '#8A95A5',
   width: 50,
    height: 50,
    borderRadius: 25, 
  },

 color4: {
   backgroundColor: '#B9C6AE',
   width: 50,
    height: 50,
    borderRadius: 25, 
  },

 colorBox: {
   width: '88%',
   height: 100,
   justifyContent: 'center',
   alignItems: 'center', 
   position: 'relative',
   marginRight: 40,
  },

});