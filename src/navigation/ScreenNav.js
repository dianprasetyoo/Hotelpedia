import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet, TextInput, Image} from 'react-native';
import { Form, Icon, Button, Item, Label, Input } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Bottom Tab Navigation
import TabNavPage from './TabNav'


const appNavigator = createStackNavigator({

//Bottom Tab Navigation
    home : {
        screen : TabNavPage,
        navigationOptions:{
            header:null
        }
    }
},
    {
        initialRouteName : 'home'
    }
)

export default createAppContainer(appNavigator);