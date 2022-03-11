import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, LogBox} from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

const firebase = require('firebase');
require('firebase/firestore');
// Firebase config for the app
const firebaseConfig = {
  apiKey: "AIzaSyAaCpkI74xxLxdrDNZCIuQrDwEeDBT2Y9c",
  authDomain: "chat-app-c58e8.firebaseapp.com",
  databaseURL: "https://chat-app-c58e8-default-rtdb.firebaseio.com",
  projectId: "chat-app-c58e8",
  storageBucket: "chat-app-c58e8.appspot.com",
  messagingSenderId: "366013209951",
  appId: "1:366013209951:web:76d07df3dc6454e00c2aea",
  measurementId: "G-6B58C8Q8LF"
};

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
      image: null,
      location: null,
    };

    // Initializing firebase
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }

    // Reference to the Firestore messages collection
    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.refMsgsUser = null;

         // To remove warning message in the console 
         LogBox.ignoreLogs([
          'Setting a timer',
          'Warning: ...',
          'undefined',
          'Animated.event now requires a second argument for options',
        ]);
  };

  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    // Checks if user is online or offline
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');

         // Listens for updates in the collection
         this.unsubscribe = this.referenceChatMessages
         .orderBy("createdAt", "desc")
         .onSnapshot(this.onCollectionUpdate)

        // User authentication performed first
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            return await firebase.auth().signInAnonymously();
          }
          // Update user state with currently active user data
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
              avatar: "https://placeimg.com/140/140/any",
            },
          });
          // Referencing messages of current user
          this.refMsgsUser = firebase
            .firestore()
            .collection("messages")
            .where("uid", "==", this.state.uid);
        });
         // Saving messages locally to asyncStorage
         this.saveMessages();
      } else {
        // When user is offline
        console.log('offline');
        this.setState({ isConnected: false });
        // Get messages from asyncStorage
        this.getMessages();
      }
    });

  }

    // When updated, set the messages state with the current data
    onCollectionUpdate = (querySnapshot) => {
      const messages = [];
      // Go through each document
      querySnapshot.forEach((doc) => {
        // Get the QueryDocumentSnapshot's data
        let data = doc.data();
        messages.push({
          _id: data._id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.user._id,
            name: data.user.name,
            avatar: data.user.avatar
          },
          image: data.image || null,
          location: data.location || null,
        });
      });
      this.setState({
        messages: messages
      });
          this.saveMessages()
    };

    componentWillUnmount() {
      // stop listening
      if (this.state.isConnected) {
        this.authUnsubscribe();
        this.unsubscribe();
      }
    }

  // To get message on sync storage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // To save message on async storage
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
    console.log(error.message);
    }
  }

  // To delete message from async storage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  // Add messages to database
  addMessages() { 
    const message = this.state.messages[0];
    // add a new messages to the collection
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
      image: message.image || "",
      location: message.location || null,
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessages();
      this.saveMessages();
    })
  };



  renderBubble(props) {
    return(
      <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000'
        }
      }}
      textStyle={{
        right: {
          color: '#fff'
        }
      }}
      />
    )
  }

    // Hide texting when offline
    renderInputToolbar(props) {
      if (this.state.isConnected == false) {
      } else {
        return <InputToolbar {...props} />;
      }
    }

    // To access CustomActions
    renderCustomActions = (props) => {
      return <CustomActions {...props} />;
    };

    // Return a MapView when surrentMessage contains location data
      renderCustomView (props) {
        const { currentMessage} = props;
          if (currentMessage.location) {
            return (
              <MapView
                style={{width: 300,
                height: 200,
                borderRadius: 13,
                margin: 3}}
                region={{
                latitude: currentMessage.location.latitude,
                longitude: currentMessage.location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
              />
            );
          }
        return null;
      }

      render() {
        let bgColor = this.props.route.params.bgColor;

    return (
      <View style={styles.container}>
      <View style={{...styles.container, backgroundColor: bgColor}}>
      <GiftedChat
      renderBubble={this.renderBubble.bind(this)}
      messages={this.state.messages}
      onSend={messages => this.onSend(messages)}
      renderInputToolbar={this.renderInputToolbar.bind(this)}
      renderActions={this.renderCustomActions}
      renderCustomView={this.renderCustomView}
      user={{
        _id: this.state.user._id,
        name: this.state.user.name,
        avatar: this.state.user.avatar
      }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },

})
