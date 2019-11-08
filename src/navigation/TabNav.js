import React, { Component } from 'react';
// import { Text, Alert, View, StyleSheet, TextInput, Image} from 'react-native';
import { Form, Icon, Button, Item, Label, Input } from 'native-base';
import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import CheckinScreen from '../screen/Checkin'
import RoomScreen from '../screen/Room'
import CustomerScreen from '../screen/Customer'
import SettingScreen from '../screen/Setting'

  
  const TabNavigator = createMaterialBottomTabNavigator({
    Checkin: {
        screen : CheckinScreen,
        navigationOptions : {
            tabBarIcon : ({tintColor}) => (
                <Icon style={{ color: tintColor }} name="checkmark-circle" />
            )
        }
    },
    Room: {
        screen : RoomScreen,
        navigationOptions : {
            tabBarIcon : ({tintColor}) =>
                <Icon style={{ color: tintColor }} name="bed"/>
        }
    },
    Customer: {
        screen : CustomerScreen,
        navigationOptions : {
            tabBarIcon : ({tintColor}) =>
                <Icon style={{ color: tintColor }} name="card"/>
        }
    },
    Setting: {
        screen : SettingScreen,
        navigationOptions : {
            tabBarIcon : ({tintColor}) =>
                <Icon style={{ color: tintColor }} name="settings"/>
        }
    },
    
},

{    
    initialRouteName: 'Room',
    activeColor: "white",
    inactiveColor: "black",
    //tabBarIcon: 'tomato',
    tabBarOptions:{
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        //tabBarIcon: 'tomato',
        
    },
    barStyle:{
        backgroundColor:'tomato' ,
    } 
    // inactiveTintColor: '#000',  
    // barStyle: { backgroundColor: '#4287f5' },  
}, 

);

export default createAppContainer(TabNavigator);