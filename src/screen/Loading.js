import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator, Text, Image} from 'react-native';

export default class Loading extends Component  {

    constructor(props)
  {
    super(props)
    this.state = {
    };
  }

  render () {
  return(
    <View style={{flex:1, alignSelf:"center", justifyContent: 'center'}}>
        {/* <ActivityIndicator size={100} /> */}
        {/* <Image source={require('../assets/logo/mylogo.png')} style={{height:150, width:150}}/> */}
        <Image source={require('../assets/image/loadings.gif')} style={{height:150, width:150}}/>
        
    </View>

  )}
  
  }