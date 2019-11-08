import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet, TextInput, Image, AsyncStorage, Modal, ActivityIndicator, ImageBackground, KeyboardAvoidingView} from 'react-native';
import { Form, Icon, Button, Item, Label, Input, Container, Header, Content, Card, CardItem, Body } from 'native-base';
import axios from 'axios'
import { StackActions } from 'react-navigation';
import { connect } from 'react-redux'
import * as actionLogin from './../redux/actions/actionLogin'


export default class Login extends Component  {

  constructor(props)
{
  super(props);
  this.state ={
    inputUsername : '',
    inputPassword : '',
    hideMode : true,
    isLoading : false,
    signInData: '',
    // correctEmail : false,

  }
}

onTextUsername (text){
this.setState({inputUsername : text})

}

onTextPassword (textPassword){
  this.setState({inputPassword : textPassword})
}


onClickHide=()=>{
  this.setState({
  hideMode : !this.state.hideMode
  })   
//  console.log("Hide is : ", this.state.hideMode);
}


login =()=>{
  const {inputUsername, inputPassword} = this.state
  this.setState({ isLoading: true})
  axios({
      method : 'POST',
      url : 'http://hotelpedias-rest-api.herokuapp.com/api/v2/login',
      data: {
          username : inputUsername, 
          password : inputPassword
      }
  }).then(result => {
      if (result.data.error == true) {
        this.setState({ isLoading: false})
          alert(result.data.message)
      } else {
        this.setState({ isLoading: false})
          // alert('Success')
          // console.log(result.data.id)
          const token = JSON.stringify(result.data)
          AsyncStorage.setItem('signInData', token)
          // AsyncStorage.clear();
          this.props.navigation.navigate('ScreenNav')
      }
  }).catch(err => {
    this.setState({ isLoading: false})
      alert('Gagal Login, Periksa Jaringan')
      // console.log(err)
  })
}


render () {
return(
  <KeyboardAvoidingView style={styles.container} behavior="potition" enabled>
    <Container style={styles.container}>
      <ImageBackground source={require('../assets/image/background.png')} style={{justifyContent: 'center', alignSelf: 'stretch',flex: 1,resizeMode: 'cover'}}>
      <View>
        <Image source={require('../assets/logo/mylogo.png')} style={styles.logo}/>
      </View>
        <Content padder>
          <Card style={{marginLeft: '5%', marginRight: '5%'}}>
          <CardItem header>
              <Text style={{fontSize: 20, fontWeight:"bold", alignItems:"center"}}>Welcome,</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Item floatingLabel style={{marginBottom: "5%"}}>
                  <Label>
                    <Text style={styles.textInputLogin}>Username</Text>  
                  </Label>
                  <Input value={this.state.inputUsername} onChangeText={(text) => this.onTextUsername(text)} style={styles.textInputLogin}></Input>            
                </Item>
                <Item floatingLabel style={{marginBottom:"10%"}}>
                  <Label StackedLabel>
                    <Text style={styles.textInputLogin}>Password</Text>  
                  </Label>
                  <Input value={this.state.inputPassword} onChangeText={(text) => this.onTextPassword(text)} secureTextEntry={this.state.hideMode} style={styles.textInputLogin}></Input>
                  { 
                    this.state.hideMode  ?  
                    <Icon name="eye-off" onPress={this.onClickHide}/> 
                    : 
                    <Icon name="eye" onPress={this.onClickHide}/>
                  }          
                </Item>
                {
                  this.state.inputPassword == '' || this.state.inputUsername == '' ?
                  //<Button onPress={() => this.props.navigation.navigate('ScreenNav')} title="Log IN"><Text style={styles.buttonLoginText}>Log In</Text></Button>
                  <Button style={styles.buttonLogin} block disabled title="Log IN" onPress = {()=>this.login()} ><Text style={styles.buttonLoginText}>Log In</Text></Button>
                  :
                  <Button style={styles.buttonLogin} block danger title="Log IN" onPress = {()=>this.login()} ><Text style={styles.buttonLoginText}>Log In</Text></Button>
                }
                <View style={styles.signUp}>
                  <Text>Dont have an account?</Text>
                  <Text style={styles.textSignUp} onPress={() => this.props.navigation.navigate('Register')}> Sign up.</Text>
                </View>
              </Body>
            </CardItem>
         </Card>
        </Content>
        </ImageBackground>
      </Container>
    </KeyboardAvoidingView>
  
)}

}


const styles = StyleSheet.create({
  container : {
    // backgroundColor : "#4CAF50",
    flex : 1
  },
  logo : {
    alignSelf : "center",
    marginTop : "10%",
    marginBottom : "10%",
    height : 150,
    width : 150
  },
  textLogin : {
    fontSize : 30,
    textAlign : "center",
    paddingBottom : 10,
    paddingTop : '10%',
    // fontFamily : 'foo'
  },
  textLoginSmall : {
    fontSize : 20,
    textAlign : "center",
    paddingBottom : 10,
    
  },
  buttonLogin : {
    borderRadius : 50,
    marginLeft : "5%",
    marginRight : "5%",
    marginTop : 10
  },
  buttonLoginText : {
    fontSize : 20,
    color : "white"
    
    
  },
  textInputLogin :{
    // borderWidth : 2,
    // borderRadius : 50,
    // paddingTop : 30,
    // paddingLeft : 10,
    // paddingBottom : 20, 

  },
  formLogin : {
    marginTop : -10,
    paddingLeft : 10,
    paddingRight : 30,
  },
  alertPasswordDanger : {
    color : "red",
  },
  alertPasswordSuccess : {
    color : "green",
  },
  alertEmailDanger : {
    color : "red",
  },
  alertEmailSuccess : {
    color : "green",
  },
  logoImage : {
    width : 120,
    height : 120,
    marginLeft : 140,
    marginTop : 50
  },
  lineStyle:{
    borderWidth: 0,
  },
  textRegister:{
    alignSelf : "center",
    marginTop : 15,
  },
  buttonRegister : {
    marginLeft : 50,
    marginRight : 50,
    paddingTop : 20,
  },
  signUp : {
    flexDirection:"row", 
    alignSelf:"center", 
    marginTop:"5%"
  },
  textSignUp : {
    color: "tomato"
  },
});