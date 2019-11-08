import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet, TextInput, Image} from 'react-native';
import { Form, Icon, Button, Item, Label, Input } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './Home'
import FavoriteScreen from './Favorite'
import ProfileScreen from './Profil'

  
  const TabNavigator = createBottomTabNavigator({
    Home: {
        screen : HomeScreen,
        navigationOptions : {
            tabBarIcon : ({tintColor}) => (
                <Icon name="apps" color={tintColor} />
            )
        }
    },
    Favorite: {
        screen : FavoriteScreen,
        navigationOptions : {
            tabBarIcon : ({tintColor}) =>
                <Icon name="star" color={tintColor}/>
        }
    },
    Profile: {
        screen : ProfileScreen,
        navigationOptions : {
            tabBarIcon : ({tintColor}) =>
                <Icon name="contact" color={tintColor}/>
        }
    },

  },
  {    
    activeColor: '#fff',  
    inactiveColor: '#000', 
     
    barStyle: { backgroundColor: '#4287f5' },  
  }, 
  );
  
  export default createAppContainer(TabNavigator);