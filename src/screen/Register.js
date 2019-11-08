import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet, TextInput, Image, AsyncStorage, Modal, ActivityIndicator, ImageBackground, KeyboardAvoidingView} from 'react-native';
import { Form, Icon, Button, Item, Label, Input, Container, Header, Content, Card, CardItem, Body, ListItem, CheckBox, List } from 'native-base';
import axios from 'axios'
import { StackActions } from 'react-navigation';
import { connect } from 'react-redux'
import * as actionRegister from './../redux/actions/actionRegister'


class Register extends Component  {

  constructor(props)
{
  super(props);
  this.state ={
    inputUsername : '',
    inputPassword : '',
    hideMode : true,
    isLoading : false,
    signInData: '',
    inputConfirmPassword: '',
    checked : false
    // correctEmail : false,

  }
}

onTextUsername (text){
this.setState({inputUsername : text})

}

onTextPassword (textPassword){
  this.setState({inputPassword : textPassword})
}

onTextConfirmPassword (textPassword){
    this.setState({inputConfirmPassword : textPassword})
  }

onClickHide=()=>{
  this.setState({
  hideMode : !this.state.hideMode
  })   
//  console.log("Hide is : ", this.state.hideMode);
}

handleCheckboxChange=(checked)=>{
    this.setState({ checked: checked });
}
    
// async register(){
//     const username = this.state.inputUsername
//     const password = this.state.inputPassword
    
//     await this.props.handleRegister(username, password)
//     this.setState({inputUsername: ''})
//     this.setState({inputPassword: ''})
//     this.setState({inputConfirmPassword: ''})
//     this.setState({checked: false})
//     this.props.navigation.navigate('ScreenNav')
//     alert('Account Success')
//   }

register =()=>{
  const {inputUsername, inputPassword} = this.state
  this.setState({ isLoading: true})
  axios({
      method : 'POST',
      url : 'http://hotelpedias-rest-api.herokuapp.com/api/v2/register',
      data: {
          username : inputUsername, 
          password : inputPassword
      }
  }).then(result => {
    console.log(result.data);
    
      if (result.data.error == true) {
        this.setState({ isLoading: false})
          alert(result.data.message)
      } else {
        this.setState({ isLoading: false})
          this.props.navigation.navigate('Login')
          alert('Success')
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

        <Content padder>
          <Card bordered style={{marginLeft: '5%', marginTop: "25%", marginRight: '5%'}}>
          <CardItem header>
              <Text style={{fontSize: 20, fontWeight:"bold", alignItems:"center"}}>Create your account,</Text>
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
                <Item floatingLabel success={(this.state.inputConfirmPassword != '' && this.state.inputConfirmPassword == this.state.inputPassword) ? true : false} style={{marginBottom:"10%"}}>
                  <Label StackedLabel>
                    <Text style={styles.textInputLogin}>Confirm Password</Text>  
                  </Label>
                  <Input value={this.state.inputConfirmPassword} onChangeText={(text) => this.onTextConfirmPassword(text)} secureTextEntry={this.state.hideMode} style={styles.textInputLogin}></Input>
                  { 
                    this.state.hideMode  ?  
                    <Icon name="eye-off" onPress={this.onClickHide}/> 
                    : 
                    <Icon name="eye" onPress={this.onClickHide}/>
                  }          
                </Item>
                    <Item style={{marginBottom:"10%"}}>
                        <CheckBox style={{marginLeft:-10}} checked={this.state.checked} onPress={() => { this.handleCheckboxChange(!this.state.checked) }} />
                        <Label style={{marginLeft:"5%"}}>
                            <Text style={{fontSize:15}}> I agree to the Terms of User</Text>
                        </Label>
                    </Item>
                {
                  this.state.inputConfirmPassword != '' && this.state.inputConfirmPassword == this.state.inputPassword && this.state.inputUsername != '' && this.state.checked == true ?
                  //<Button onPress={() => this.props.navigation.navigate('ScreenNav')} title="Log IN"><Text style={styles.buttonLoginText}>Log In</Text></Button>
                  <Button style={styles.buttonLogin} block danger title="Register" onPress = {()=>this.register()} ><Text style={styles.buttonLoginText}>Log In</Text></Button>
                  :
                  <Button style={styles.buttonLogin} block disabled title="Register"><Text style={styles.buttonLoginText}>Sign Up</Text></Button>
                }
                <View style={styles.signUp}>
                  <Text>Aready have an account?</Text>
                  <Text style={styles.textSignUp} onPress={() => this.props.navigation.navigate('Login')}> Login.</Text>
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
  
  const mapDispatchToProps = dispatch => {
    return {   
      handleRegister: (username, password) => dispatch(actionRegister.handleRegister(username, password))
    }
  }

const styles = StyleSheet.create({
  container : {
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
    marginTop:"5%",
  },
  textSignUp : {
    color: "tomato"
  },
});

export default connect(
    mapDispatchToProps
  )(Register);