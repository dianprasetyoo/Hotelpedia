import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet, TextInput, Image, AsyncStorage} from 'react-native';
import { Button, Header, Container, Content, Card, CardItem, Body, Title } from 'native-base';
import { connect } from 'react-redux'
// const image = '../assets/image/user.png'


export default class Setting extends Component  {

  constructor(props)
{
  super(props)
  this.state = {
    signInData: '',
  };
  
  AsyncStorage.getItem('signInData', (err, res) => {
    if (!err) {
      this.setState({
        signInData: JSON.parse(res)
      })

      const token = this.state.signInData.token
      console.log(token)
    } else {
      alert('Cannot Get Token')
    }
  })


}

// componentDidMount() {
//   AsyncStorage.getItem('signInData', (err, res) => {
//     if (!err) {
//       this.setState({
//         signInData: JSON.parse(res)
//       })

//       const token = this.state.signInData.token
//     } else {
//       alert('Cannot Get Token')
//     }
//   })
//   // const id = AsyncStorage.getItem.signInData.id
// }

  logout=()=>{
    AsyncStorage.clear();
    this.props.navigation.navigate('Login')
  }

render () {
return(
  <Container>
   <Header style={{ backgroundColor: '#D72312', marginBottom:20}}>
      <Body>
        <Title style={{ alignSelf: "center" }}><Text>Settings</Text></Title>
      </Body>
    </Header>
  <Content padder>
    <Card style={{marginLeft:"5%", marginRight:"5%"}}>
      <CardItem header button>
        <Content>
          <Image style={{height:60, width:60}} source={require('../assets/image/user.png')} ></Image>
        </Content>
        <Content style={{marginRight:"30%"}}>
          <Text style={styles.textUsername}>{this.state.signInData.username}</Text>
          <Text style={{fontSize:10}}>Admin</Text>
        </Content>
      </CardItem>
    </Card>
    <Button block danger style={styles.buttonLogout} onPress = {()=>this.logout()}><Text style={{color:"white"}}>Logout</Text></Button>
  </Content>
  
</Container>
)}

}


const styles = StyleSheet.create({
  imageProfile : {
    width : 200,
    height : 200,
    alignSelf : "center",
    marginTop : 60
  },
  buttonLogout : {
    marginTop : 20,
    margin : 10,
    borderRadius : 40,
  },
  textUsername : {
    fontSize : 15
  },
});