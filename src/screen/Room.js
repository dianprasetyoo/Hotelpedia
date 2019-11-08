import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet, TextInput, Image, ScrollView, FlatList, TouchableOpacity, Modal, TouchableHighlight, AsyncStorage} from 'react-native';
import { Form, Icon, Button, Item, Label, Input, Content, Header, Body, Title, Right, ListItem, Container, Left } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { connect } from 'react-redux'
import * as actionRooms from './../redux/actions/actionRooms'


class Room extends Component  {


  constructor(props)
{
  super(props)
  this.state = {
    modalVisible: false,
    modalVisibleEdit: false,
    inputRoom: '',
    idRoom: '',
  };

  AsyncStorage.getItem('signInData', (err, res) => {
    if (!err) {
      this.setState({
        signInData: JSON.parse(res)
      })
      console.log(this.state.signInData)
      this.props.handleGetRooms(this.state.signInData.token)
      // this.props.handleAddRooms(this.state.signInData.token)
      const token = this.state.signInData.token
      // console.log(token)
    } else {
      alert('Cannot Get Token')
    }
  })

}

onTextRoom (text){
  this.setState({inputRoom : text})    
}

setModalVisible(visible) {
  this.setState({modalVisible: visible});
}
setModalVisibleEdit(visible) {
  this.setState({modalVisibleEdit: visible});
  this.setState({inputRoom: ''})
  this.setState({idRoom: ''})
}

async AddRooms(){
  const token = this.state.signInData.token
  const name = this.state.inputRoom
  // console.log(token)
  if (this.state.inputRoom == ""){
    alert('Data Harus Diisi')
  } else {
    await this.props.handleAddRooms(name, token)
    await this.setState({modalVisible: false})
    await this.props.handleGetRooms(token)
    await this.setState({inputRoom: ''})
    alert('Success')
  }
  
}

modalEditRooms(name, id){
  this.setState({modalVisibleEdit: true})
  this.setState({inputRoom: name})
  this.setState({idRoom: id})
}

async EditRooms(){
  const name = this.state.inputRoom
  const id = this.state.idRoom
  const token = this.state.signInData.token
  if (this.state.inputRoom){
    alert('Data Harus Diisi')
  } else {
    await this.props.handleEditRooms(name, id, token)
    await this.setState({modalVisibleEdit: false})
    await this.props.handleGetRooms(token)
    await this.setState({inputRoom: ''})
    await this.setState({idRoom: ''})
    alert('Success')
  }
  
}

async deleteRooms(){
  const id = await this.state.idRoom
  const token = await this.state.signInData.token
  await this.props.handleDeleteRooms(id, token)
  await this.setState({modalVisibleEdit: false})
  await this.props.handleGetRooms(token)
  await this.setState({inputRoom: ''})
  await this.setState({idRoom: ''})
  alert('Success')
}

render () {
console.log("PROPS ROOM",this.props.roomsLocal)
if (this.props.roomsLocal2.isLoading==true){
  return(
    <View style={{flex:1, alignSelf:"center", justifyContent: 'center'}}>
        <Image source={require('../assets/image/loading1.gif')} style={{height:150, width:150}}/>
    </View>
  )
} else {
return(
  <View style={{flex: 1}} >
    
    <Header style={{ backgroundColor: '#D72312'}}>
      <Body>
        <Title style={{ alignSelf: "center" }}><Text>Room</Text></Title>
      </Body>
    </Header>
  
    <View style={{flex: 8}}>
      <FlatList 
          scrollEnabled       
          data={this.props.roomsLocal}
          numColumns={3}
          renderItem={({item,index})=>(
              <Button block style={styles.listRoom} onPress={() => this.modalEditRooms(item.name, item.id)}>
                <Text style={styles.textListRoom}>{item.name}</Text>
              </Button>
          )}
        />      
    </View>

    <View style={{flex: 1, marginHorizontal: "10%"}}>
      <Button block danger rounded onPress={() => {this.setModalVisible(true)}}>
          <Icon name="add"></Icon>
      </Button> 
    </View>

{/* MODAL ADD */}
      <Modal animationType="fade" transparent={true} visible={this.state.modalVisible}>
        <View style={{flex:1, backgroundColor: 'rgba(0,0,0,0.3)'}}>
          <View style={{height:null, marginTop:"40%", backgroundColor: "white", marginLeft:20, marginRight: 20}}>
            <Header style={{ backgroundColor: '#D72312', marginBottom:20}}>
              <Body>
                <Title style={{ alignSelf: "center" }}><Text>Add Room</Text></Title>
              </Body>
            </Header>
            <Item floatingLabel style={{marginLeft:"10%", marginRight:"10%"}}>
              <Label StackedLabel style={{margin:10}}><Text>Input Room</Text></Label>
              <Input style={{margin:10}} value={this.state.inputRoom} onChangeText={(text) => this.onTextRoom(text)}></Input>
            </Item>
            <View style={{ flexDirection:"row", margin: 20}}>
              <Button style={styles.buttonModal} block danger onPress={() => {this.setModalVisible(!this.state.modalVisible)}}><Text style={{color:"white"}}>Back</Text></Button>
              <Button style={styles.buttonModal} block danger onPress={() => this.AddRooms()}><Text style={{color:"white"}}>Save</Text></Button>
            </View>
          </View>
        </View>
      </Modal>


{/* MODALEDIT */}
   
      <Modal animationType="fade" transparent={true} visible={this.state.modalVisibleEdit}>
        <View style={{flex:1, backgroundColor: 'rgba(0,0,0,0.3)'}}>
          <View style={{height:null, marginTop:"40%", backgroundColor: "white", marginLeft:20, marginRight: 20}}>
            <Header style={{ backgroundColor: '#D72312', marginBottom:20}}>
              <Left/>
              <Body>
                <Title style={{ alignSelf: "center" }}><Text>Edit Room</Text></Title>
              </Body>
              <Right>
                <Button transparent onPress={() => {this.setModalVisibleEdit(!this.state.modalVisibleEdit)}}>
                  <Icon name="close" />
                </Button>
              </Right>
      </Header>
            <Item floatingLabel style={{marginLeft:"10%", marginRight:"10%"}}>
              <Label StackedLabel style={{margin:10}}><Text>Input Room</Text></Label>
              <Input style={{margin:10}} value={this.state.inputRoom} onChangeText={(text) => this.onTextRoom(text)}></Input>
            </Item>
            <View style={{ flexDirection:"row", margin: 20}}>
              <Button style={styles.buttonModal} block danger onPress={() => this.deleteRooms()}><Text style={{color:"white"}}>Delete</Text></Button>
              <Button style={styles.buttonModal} block danger onPress={() => this.EditRooms(this.props.roomsLocal.id)}><Text style={{color:"white"}}>Save</Text></Button>
            </View>
          </View>
        </View>
      </Modal>
   
  </View>
)}
          }
}

const mapStateToProps = state => {
  return {
    roomsLocal: state.rooms.rooms,
    roomsLocal2: state.rooms
  }
}

const mapDispatchToProps = dispatch => {
  return {   
    handleGetRooms: (token) => dispatch(actionRooms.handleGetRooms(token)),
    handleAddRooms: (name, token) => dispatch(actionRooms.handleAddRooms(name, token)),
    handleEditRooms: (name, id, token) => dispatch(actionRooms.handleEditRooms(name, id, token)),
    handleDeleteRooms: (id,token)=>dispatch(actionRooms.handleDeleteRooms(id, token))
  }
}

const styles = StyleSheet.create({
  listRoom : {
      backgroundColor : 'tomato',
      height : 100,
      width : "30%",
      margin : 6,
      borderRadius : 20,
    
  },
  textListRoom : {
    color : 'white',
    fontSize : 15,
    fontWeight : "bold",
},
buttonAddRoom : {
  borderRadius : 40,
  marginLeft : "10%",
  marginRight : "10%"
},
buttonModal : {
  margin : 10,
  borderRadius : 40,
  width : "45%"
},

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
