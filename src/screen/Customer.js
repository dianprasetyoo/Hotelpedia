import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, AsyncStorage, Modal, Platform, ActivityIndicator} from 'react-native';
import {  Header, Title, Body, Container, Content, Card, CardItem, Fab, Icon, Item, Label, Input, Button, Right, Left } from 'native-base';
import { connect } from 'react-redux'
import * as actionCustomers from './../redux/actions/actionCustomer'
import ImagePicker from 'react-native-image-picker'
// import * as firebase from 'firebase'

const createFormData = (photo) =>{
  const data = new FormData()
  data.append('customerImage', {
    name: photo.fileName,
    type: photo.type,
    uri : Platform.OS == "android" ? photo.uri : photo.uri.replace('file://', '')
  })
  return data
}

// var firebaseConfig = {
//   apiKey: "AIzaSyDxKv3DVrm6GljMFJBQEueAVvqt6IpVirU",
//   authDomain: "hotelpedia-d7bd2.firebaseapp.com",
//   databaseURL: "https://hotelpedia-d7bd2.firebaseio.com",
//   projectId: "hotelpedia-d7bd2",
//   storageBucket: "hotelpedia-d7bd2.appspot.com",
//   messagingSenderId: "616764263757",
//   appId: "1:616764263757:web:048159a6da546134a33b04",
//   measurementId: "G-NLD0J24YDV"
// };

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }


class Customer extends Component  {

  constructor(props)
  {
    super(props)
    this.state = {
      signInData: '',
      modalVisible: false,
      modalVisibleEdit: false,
      inputCustomer: '',
      inputPhoneNumber: '',
      inputIdentityNumber: '',
      idCustomer: '',
      avatarSource: "",
    };
      AsyncStorage.getItem('signInData', (err, res) => {
        if (!err) {
          this.setState({
            signInData: JSON.parse(res)
          })
          console.log(this.state.signInData)
          this.props.handleGetCustomers(this.state.signInData.token)
          const token = this.state.signInData.token
          // console.log(token)
        } else {
          alert('Cannot Get Token')
        }
      })
  }

  onTextCustomer (text){
    this.setState({inputCustomer : text})    
}
onTextIdentityNumber (text){
  this.setState({inputIdentityNumber : text})    
}
onTextPhoneNumber (text){
  this.setState({inputPhoneNumber : text})    
}

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setModalVisibleEdit(visible) {
    this.setState({modalVisibleEdit: visible});
    this.setState({inputCustomer: ''})
    this.setState({inputIdentityNumber: ''})
    this.setState({inputPhoneNumber: ''})
    this.setState({idCustomer: ''})
    this.setState({avatarSource: ''})
  }

  modalEditCustomer(name, identityNumber, phoneNumber, id, image){
    this.setState({modalVisibleEdit: true})
    this.setState({
      inputCustomer: name,
      inputIdentityNumber: identityNumber.toString(),
      inputPhoneNumber: phoneNumber.toString(),
      idCustomer: id,
      avatarSource: image
    })
  }

  async EditCustomer(){
    const name = this.state.inputCustomer
    const id = this.state.idCustomer
    const token = this.state.signInData.token
    const identityNumber = this.state.inputIdentityNumber
    const phoneNumber = this.state.inputPhoneNumber

    if (this.state.inputCustomer == '' || this.state.inputPhoneNumber == '' || this.state.inputIdentityNumber == '') {
      alert('Data Harus Diisi')
    } else {
      await this.uploadPhotoCustomer()
      const image = this.props.customerUrl
      await this.props.handleEditCustomer(name, identityNumber, phoneNumber, id, image, token)
      await this.setState({modalVisibleEdit: false})
      await this.props.handleGetCustomers(token)
      this.setState({inputCustomer: ''})
      this.setState({inputIdentityNumber: ''})
      this.setState({inputPhoneNumber: ''})
      this.setState({idCustomer: ''})
      alert('Success')
    }
  }

  async DeleteCustomer(){
    const id = this.state.idCustomer
    const token = this.state.signInData.token
    
      await this.props.handleDeleteCustomer(id,token)
      await this.setState({modalVisibleEdit: false})
      await this.props.handleGetCustomers(token)
      this.setState({inputCustomer: ''})
      this.setState({inputIdentityNumber: ''})
      this.setState({inputPhoneNumber: ''})
      this.setState({idCustomer: ''})
      alert('Success')
  }

  async AddCustomer(){
    const token = this.state.signInData.token
    const name = this.state.inputCustomer
    const identityNumber = this.state.inputIdentityNumber.toString()
    const phoneNumber = this.state.inputPhoneNumber.toString()
    
    if (this.state.inputCustomer == '' || this.state.inputPhoneNumber == '' || this.state.inputIdentityNumber == '') {
      alert('Data Harus Diisi')
    }else{  
      await this.uploadPhotoCustomer()
      const image = this.props.customerUrl
      await this.props.handleAddCustomer(name, identityNumber, phoneNumber, image, token)
      await this.setState({modalVisible: false})
      await this.props.handleGetCustomers(token)
      await this.setState({inputCustomer: ''})
      await this.setState({inputPhoneNumber: ''})
      await this.setState({inputIdentityNumber: ''})
      alert('success')
    }
    
  }

  selectPhotoTapped() {
    const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
        skipBackup: true,
        },
    };
    ImagePicker.showImagePicker(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
            console.log('User cancelled photo picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            let source = response;
        this.setState({
            avatarSource: source,
        });
        }
    });
  }

  async uploadPhotoCustomer(){
    const param = {
      token : this.state.signInData.token,
      data: await createFormData(this.state.avatarSource)
    }  
    await this.props.handleUploadImageCustomer(param)
  }

render () {
  console.log(this.props.customersLocal)
  if (this.props.customersLocal2.isLoading==true){
    return(
    <View style={{flex:1, alignSelf:"center", justifyContent: 'center'}}>
        <Image source={require('../assets/image/loading1.gif')} style={{height:150, width:150}}/>
    </View>
    )
  } else {
return(
  <View style={{flex: 1, marginBottom:20}}>
  <View >
    <Header style={{ backgroundColor: '#D72312', marginBottom:20}}>
      <Body>
        <Title style={{ alignSelf: "center" }}><Text>Customer</Text></Title>
      </Body>
    </Header>
  </View>
  <View style={{marginBottom: "5%"}}>
    <FlatList         
      scrollEnabled={true}       
      data={this.props.customersLocal}
      vertical={true}
      style={{marginBottom:"5%"}}
      // style={{marginBottom: 80}}
      //numColumns={2}
      renderItem={({item,index})=>(
      <Card style={{marginLeft:"5%", marginRight:"5%"}}>
         <CardItem onLongPress={()=>{console.log("pressed")}} header button onPress={() => this.modalEditCustomer(item.name, item.identity_number, item.phone_number, item.id, item.image)}>
        {/* <CardItem onLongPress={()=>{alert("pressed")}} delayLongPress={1500} header button > */}
          <Content>
            {
              item.image == null ?
              <Image style={{height:60, width:60}} source={require('../assets/image/user.png')} ></Image>
              :
              <Image style={{height:60, width:60, borderRadius: 30}} source={{uri : item.image}} ></Image>
            }
            {/* <Image style={{height:60, width:60}} source={require('../assets/image/user.png')} ></Image> */}
          </Content>
          <Content style={{marginRight:"30%"}}> 
            <Text style={{fontSize:15}}>{item.name}</Text>
            <Text style={{fontSize:10}}>{`phone : ${item.phone_number}`}</Text>
            <Text style={{fontSize:10}}>{`identity : ${item.identity_number}`}</Text>
          </Content>
        </CardItem>
      </Card>
      )}
    />
  </View>
  <Fab
    active="true"
    containerStyle={{ }}
    style={{ backgroundColor: 'tomato' }}
    onPress={() => {this.setModalVisible(true)}}
    position="bottomRight">
    <Icon name="md-add" />
  </Fab>

  {/* MODAL ADD */}
      <Modal animationType="fade" transparent={true} visible={this.state.modalVisible}>
        <View style={{flex:1, backgroundColor: 'rgba(0,0,0,0.3)'}}>
          <View style={{height:null, marginTop:"20%", backgroundColor: "white", marginLeft:20, marginRight: 20}}>
          <Header style={{ backgroundColor: '#D72312', marginBottom:20}}>
        <Body>
          <Title style={{ alignSelf: "center" }}><Text>Add Customer</Text></Title>
        </Body>
      </Header>
            <Item floatingLabel style={{marginLeft:"10%", marginRight:"10%"}}>
              <Label StackedLabel style={{margin:10}}><Text>Customer Name</Text></Label>
              <Input style={{margin:10}} value={this.state.inputCustomer} onChangeText={(text) => this.onTextCustomer(text)}></Input>
            </Item>
            <Item floatingLabel style={{marginLeft:"10%", marginRight:"10%"}}>
              <Label StackedLabel style={{margin:10}}><Text>Identity Number</Text></Label>
              <Input keyboardType={"number-pad"} style={{margin:10}} value={this.state.inputIdentityNumber} onChangeText={(text) => this.onTextIdentityNumber(text)}></Input>
            </Item>
            <Item floatingLabel style={{marginLeft:"10%", marginRight:"10%"}}>
              <Label StackedLabel style={{margin:10}}><Text>Phone Number</Text></Label>
              <Input keyboardType={"number-pad"} style={{margin:10}} value={this.state.inputPhoneNumber} onChangeText={(text) => this.onTextPhoneNumber(text)}></Input>
            </Item>

            <Item  style={{marginLeft:"10%", marginRight:"10%", marginTop: '5%'}}>
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                  {this.state.avatarSource === "" ? (
                      <Label StackedLabel style={{margin:10}}><Text>Select File Photo</Text></Label>
                  ) : (
                      
                      <Image style={{height:50, width:50, marginLeft:"40%", marginRight:"40%"}} source={this.state.avatarSource} />
                  )}
              </TouchableOpacity>
            </Item>

            <View style={{ flexDirection:"row", margin: 20}}>
              <Button style={styles.buttonModal} block danger onPress={() => {this.setModalVisible(!this.state.modalVisible)}}><Text style={{color:"white"}}>Back</Text></Button>
              {this.props.customersLocal2.isLoading == true ?
              <ActivityIndicator style={styles.buttonModal} />
              :
              <Button disabled={this.props.customersLocal2.isLoading == true ? true : false} style={styles.buttonModal} block danger={this.props.customersLocal2.isLoading == true ? false : true} onPress={() => this.AddCustomer()}><Text style={{color:"white"}}>Save</Text></Button>
              }             
            </View>
          </View>
        </View>
      </Modal>

    {/* MODAL EDIT */}
      <Modal animationType="fade" transparent={true} visible={this.state.modalVisibleEdit}>
        <View style={{flex:1, backgroundColor: 'rgba(0,0,0,0.3)'}}>
          <View style={{height:null, marginTop:"20%", backgroundColor: "white", marginLeft:20, marginRight: 20}}>
            <Header style={{ backgroundColor: '#D72312', marginBottom:20}}>
              <Left/>
              <Body>
                <Title><Text>Edit Customer</Text></Title>
              </Body>
              <Right>
                <Button transparent onPress={() => {this.setModalVisibleEdit(!this.state.modalVisibleEdit)}}>
                  <Icon name="close" />
                </Button>
              </Right>
            </Header>
            <Item floatingLabel style={{marginLeft:"10%", marginRight:"10%"}}>
              <Label StackedLabel style={{margin:10}}><Text>Customer Name</Text></Label>
              <Input style={{margin:10}} value={this.state.inputCustomer} onChangeText={(text) => this.onTextCustomer(text)}></Input>
            </Item>
            <Item floatingLabel style={{marginLeft:"10%", marginRight:"10%"}}>
              <Label StackedLabel style={{margin:10}}><Text>Identity Number</Text></Label>
              <Input keyboardType={"number-pad"} style={{margin:10}} value={this.state.inputIdentityNumber} onChangeText={(text) => this.onTextIdentityNumber(text)}></Input>
            </Item>
            <Item floatingLabel style={{marginLeft:"10%", marginRight:"10%"}}>
              <Label StackedLabel style={{margin:10}}><Text>Phone Number</Text></Label>
              <Input keyboardType={"number-pad"} style={{margin:10}} value={this.state.inputPhoneNumber} onChangeText={(text) => this.onTextPhoneNumber(text)}></Input>
            </Item>
            <Item  style={{marginLeft:"10%", marginRight:"10%", marginTop: '5%'}}>
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                  {this.state.avatarSource === "" ? (
                      <Label StackedLabel style={{margin:10}}><Text>Select File Photo</Text></Label>
                  ) : (
                      <Image style={{height:50, width:50, marginLeft:"40%", marginRight:"40%"}} source={this.state.avatarSource} />
                  )}
              </TouchableOpacity>
            </Item>
            <View style={{ flexDirection:"row", margin: 20}}>
              <Button style={styles.buttonModal} block danger onPress={() => this.DeleteCustomer()}><Text style={{color:"white"}}>Delete</Text></Button>
              <Button disabled={this.props.customersLocal2.isLoading == true ? true : false} danger={this.props.customersLocal2.isLoading == true ? false : true} style={styles.buttonModal} block onPress={() => this.EditCustomer()}><Text style={{color:"white"}}>Save</Text></Button>
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
    customersLocal: state.customers.customers,
    customersLocal2: state.customers,
    customerUrl: state.customers.imageUrl
  }
}

const mapDispatchToProps = dispatch => {
  return {   
    handleGetCustomers: (token) => dispatch(actionCustomers.handleGetCustomers(token)),
    handleAddCustomer: (name, identityNumber, phoneNumber, image, token) => dispatch(actionCustomers.handleAddCustomer(name, identityNumber, phoneNumber, image, token)),
    handleEditCustomer: (name, identityNumber, phoneNumber, id, image, token) => dispatch(actionCustomers.handleEditCustomer(name, identityNumber, phoneNumber, id, image, token)),
    handleUploadImageCustomer: (param)=>dispatch(actionCustomers.handleUploadImageCustomer(param)),
    handleDeleteCustomer: (id,token)=>dispatch(actionCustomers.handleDeleteCustomer(id, token))
  }
}


const styles = StyleSheet.create({
  imageProfile : {
    width : 200,
    height : 200,
    alignSelf : "center",
    marginTop : 60
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
)(Customer);