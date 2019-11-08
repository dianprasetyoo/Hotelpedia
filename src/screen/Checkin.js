import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, FlatList, AsyncStorage, Modal, Picker } from 'react-native';
import { Form, Icon, Button, Item, Label, Input, Content, Header, Body, Title, Container } from 'native-base';
import { connect } from 'react-redux'
import * as actionCheckin from './../redux/actions/actionCheckin'
import * as actionCustomers from './../redux/actions/actionCustomer'
import moment from "moment";

class Checkin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      signInData: '',
      modalVisibleCheckin: false,
      modalVisibleCheckout: false,
      pickerCustomer: '',
      roomName: '',
      roomId: '',
      inputDuration: '',
      orderId: '',
      interval: ''
    };

    AsyncStorage.getItem('signInData', (err, res) => {
      if (!err) {
        this.setState({
          signInData: JSON.parse(res),
        })
        const token = this.state.signInData.token
        this.props.handleGetCheckin(token)
        this.props.handleGetCustomers(this.state.signInData.token)
          .then(() => {
            this.setState({
              pickerCustomer: this.props.customersLocal[0].id
            })
          })
      } else {
        alert('Cannot Get Token')
      }
    })

    this.interval = setInterval(() => {
      this.refreshData()
    }, 1000) //refresh data per detik

  }

  onValueChange(value) {
    this.setState({
      pickerCustomer: value
    });
  }

  onTextDuration(text) {
    this.setState({ inputDuration: text })
  }

  onTextCustomer(text) {
    this.setState({ pickerCustomer: text })
  }

  setModalVisibleCheckin(visible) {
    this.setState({ modalVisibleCheckin: visible });
    this.setState({ roomName: '' })
    this.setState({ roomId: '' })
    this.setState({ inputDuration: '' })
  }

  modalCheckin(name, id) {
    this.setState({ modalVisibleCheckin: true })
    this.setState({ roomName: name })
    this.setState({ roomId: id })
  }

  setModalVisibleCheckout(visible) {
    this.setState({ modalVisibleCheckout: visible });
    this.setState({ roomName: '' })
    this.setState({ roomId: '' })
    this.setState({ pickerCustomer: '' })
    this.setState({ orderId: '' })
  }

  modalCheckout(name, id, customerName, orderId) {
    this.setState({ modalVisibleCheckout: true })
    this.setState({ roomName: name })
    this.setState({ roomId: id })
    this.setState({ pickerCustomer: customerName })
    this.setState({ orderId: orderId })
  }

  async checkin() {
    const token = this.state.signInData.token
    const idCustomer = this.state.pickerCustomer
    const idRoom = this.state.roomId
    const duration = this.state.inputDuration
    const order_end_time = moment().add(Number(duration), 'm')
    const is_done = false
    const is_booked = true

    this.state.pickerCustomer == '' ?
      alert('Please Select Customer')
      :
    await this.props.handleAddCheckin(idRoom, idCustomer, duration, order_end_time, is_booked, is_done, token)
    await this.setState({ modalVisibleCheckin: false })
    this.props.handleGetCheckin(token)
    this.props.handleGetCustomers(token)
    this.setState({ roomName: '' })
    this.setState({ roomId: '' })
    this.setState({ inputDuration: '' })
  }


  componentWillUnmount() {
    clearInterval(this.interval)
  }

  async refreshData() {
    const data = this.props.checkinLocal
    await this.props.handleGetCheckin(this.state.signInData.token)
    for (let i = 0; i < data.length; i++) {
      if (data[i].order[0] !== undefined) {
        if (moment(data[i].order[0].order_end_time).diff(moment(), 's') <= 0) {
          console.log(data[i].order[0].order_end_time);
          await this.props.handleCheckout(data[i].order[0].id, this.state.signInData.token)
        }
      }
    }
  }

  async checkout() {
    const token = this.state.signInData.token
    const orderId = this.state.orderId

    await this.props.handleCheckout(orderId, token)
    await this.setState({ modalVisibleCheckout: false })
    await this.props.handleGetCheckin(token)
    this.props.handleGetCustomers(token)
    this.setState({ roomName: '' })
    this.setState({ roomId: '' })
    this.setState({ pickerCustomer: '' })
    this.setState({ orderId: '' })
  }


  render() {
    // console.log(this.props.checkinLocal)
    // // console.log(this.state.signInData.token)
    // console.log(this.props.customersLocal)
    console.disableYellowBox = true;

    return (
      <View style={{flex: 1}}>

        <Header style={{ backgroundColor: '#D72312'}}>
          <Body>
            <Title style={{ alignSelf: "center" }}><Text>Checkin</Text></Title>
          </Body>
        </Header>

        <View style={{flex: 8}}>
          <FlatList
            scrollEnabled={true}
            data={this.props.checkinLocal}
            vertical={true}
            numColumns={3}
            renderItem={({ item, index }) => (
              <Button block onPress={item.order != false ? () => this.modalCheckout(item.name, item.id, item.order[0].customersID.name, item.order[0].id) : () => this.modalCheckin(item.name, item.id)} style={(item.order == false ? styles.listRoomFalse : styles.listRoomTrue)}>
                <Text style={styles.textListRoom}>{item.name}</Text>
                <Text style={styles.textListRoom}>
                  {(item.order == false ? "Empty" :
                    `${moment(item.order[0].order_end_time).diff(moment(), 'h')}` +`:`+
                    `${(moment(item.order[0].order_end_time).diff(moment(), 'm')%60)}` +`:`+
                    `${(moment(item.order[0].order_end_time).diff(moment(), 's')%60)}`
                  )}
                </Text>
              </Button>
            )}
          />
        </View>


        {/* //MODAL CHECKIN */}
          <Modal animationType="fade" transparent={true} visible={this.state.modalVisibleCheckin}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}>
              <View style={{ height: null, marginTop: "40%", backgroundColor: "white", marginLeft: 20, marginRight: 20 }}>
                <Header style={{ backgroundColor: '#D72312', marginBottom: 20 }}>
                  <Body>
                    <Title style={{ alignSelf: "center" }}><Text>Checkin</Text></Title>
                  </Body>
                </Header>
                <Item floatingLabel style={{ marginLeft: "10%", marginRight: "10%" }}>
                  <Input disabled style={{ margin: 10 }} value={this.state.roomName} onChangeText={(text) => this.onTextRoom(text)}></Input>
                </Item>
                <Form>
                  <Picker
                    mode="dropdown"
                    style={{ marginLeft: 40, marginRight: 30, fontSize: 80 }}
                    onValueChange={(itemValue) => (this.setState({ pickerCustomer: itemValue }))}
                    selectedValue={this.state.pickerCustomer}
                  >
                    <Picker.Item label="Select Customer"/>
                    {
                      this.props.customersLocal.map((item) =>
                        <Picker.Item label={`${item.name} - ${item.phone_number}`} value={item.id} key={item.id}/>
                      )
                    }
                  </Picker>
                </Form>
                <Item floatingLabel style={{ marginLeft: "10%", marginRight: "10%" }}>
                  <Label StackedLabel style={{ margin: 10 }}><Text>Duration</Text></Label>
                  <Input numberOfLines={4} keyboardType={"number-pad"} style={{ margin: 10 }} value={this.state.inputDuration} onChangeText={(text) => this.onTextDuration(text)}></Input>
                </Item>
                <View style={{ flexDirection: "row", margin: 20 }}>
                  <Button style={styles.buttonModal} block danger onPress={() => { this.setModalVisibleCheckin(!this.state.modalVisibleCheckin) }}><Text style={{ color: "white" }}>Back</Text></Button>
                  <Button style={styles.buttonModal} block danger onPress={() => this.checkin()}><Text style={{ color: "white" }}>Checkin</Text></Button>
                </View>
              </View>
            </View>
          </Modal>


        {/* //MODAL CHECKOUT */}
          <Modal animationType="fade" transparent={true} visible={this.state.modalVisibleCheckout}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}>
              <View style={{ height: null, marginTop: "40%", backgroundColor: "white", marginLeft: 20, marginRight: 20 }}>
                <Header style={{ backgroundColor: '#D72312', marginBottom: 20 }}>
                  <Body>
                    <Title style={{ alignSelf: "center" }}><Text>Checkout</Text></Title>
                  </Body>
                </Header>
                <Item floatingLabel style={{ marginLeft: "10%", marginRight: "10%" }}>
                  <Input disabled style={{ margin: 10 }} value={this.state.roomName} onChangeText={(text) => this.onTextRoom(text)}></Input>
                </Item>
                <Item floatingLabel style={{ marginLeft: "10%", marginRight: "10%" }}>
                  <Input disabled style={{ margin: 10 }} value={this.state.pickerCustomer} onChangeText={(text) => this.onTextCustomer(text)}></Input>
                </Item>
                <View style={{ flexDirection: "row", margin: 20 }}>
                  <Button style={styles.buttonModal} block danger onPress={() => { this.setModalVisibleCheckout(!this.state.modalVisibleCheckout) }}><Text style={{ color: "white" }}>Back</Text></Button>
                  <Button style={styles.buttonModal} block danger onPress={() => this.checkout()}><Text style={{ color: "white" }}>Checkout</Text></Button>
                </View>
              </View>
            </View>
          </Modal>


      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    checkinLocal: state.checkins.checkins,
    customersLocal: state.customers.customers,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetCheckin: (token) => dispatch(actionCheckin.handleGetCheckin(token)),
    handleGetCustomers: (token) => dispatch(actionCustomers.handleGetCustomers(token)),
    handleAddCheckin: (idRoom, idCustomer, duration, order_end_time, is_booked, is_done, token) => dispatch(actionCheckin.handleAddCheckin(idRoom, idCustomer, duration, order_end_time, is_booked, is_done, token)),
    handleCheckout: (orderId, token) => dispatch(actionCheckin.handleCheckout(orderId, token))
  }
}


const styles = StyleSheet.create({
  listRoomTrue: {
    backgroundColor: 'tomato',
    height: 100,
    width: "30%",
    margin: 6,
    borderRadius: 20,
    flexDirection: "column"
  },
  listRoomFalse: {
    backgroundColor: 'grey',
    height: 100,
    width: "30%",
    margin: 6,
    borderRadius : 20,
    flexDirection: "column"
  },
  list: {
    backgroundColor: 'red',
    fontSize: 40,
  },
  textListRoom: {
    color: 'white',
    fontSize: 15,
    fontWeight: "bold"
  },
  buttonModal: {
    margin: 10,
    borderRadius: 40,
    width: "45%"
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkin);