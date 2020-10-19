import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Fab,
  Icon,
  Button,
  View,
  Card,
  CardItem, Spinner
} from "native-base";
import { getSlots, getSwingExecuteOut } from "../../services/stock.service";
import moment from "moment";
export default ({route,navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] :any= useState([]);

  let unsubscribe:any;
  const fetchData= ()=>{
    setLoading(true);
     getSlots().then(x=>{
           
      setSlots(x);
  }).finally(()=>{
    setLoading(false);
  })
  }
    useEffect(()=>{
      
      unsubscribe= navigation.addListener(
        'focus',
        () => {
          fetchData();
        }
      );

      return unsubscribe;
       
    },[navigation])


    const buttonStyle= {
      margin:10
    }
  return (
    <Container>
      <View style={{ flex: 1 }}>
        {loading ?
      <Spinner  color='blue'  />  : 
      <>
      <Card>
            <CardItem header>
                <Left>
            <Text style={{fontSize:20,color:'royalblue'}}>Swings Slots</Text></Left>
            <Right>
            <Text>
                  Total Slots : {slots.length}/10
                </Text>
            </Right>
              </CardItem>
            <CardItem>
             
            <Body>
              <Text>Balance Amount :₹{slots && slots.length && slots[0].balancedAmount.toFixed(2)}</Text>

              </Body>
            </CardItem>
           
         </Card>
        <Content>
        <View style={{ flexDirection: "row",  justifyContent: 'center' ,padding:10, }}>
        <Button 
      style={buttonStyle}
      onPress={() => {
        navigation.navigate('SlotDetails')
      }}
    >
    <Icon name="add" /> 
    </Button>
    <Button
       style={buttonStyle}
      onPress={() => {
        navigation.navigate('SlotTransactions')
      }}
    >
    <Text> Transactions</Text>
    </Button>
    </View>
    
    
          <List>
          
              {slots && slots.map((x:any)=> <ListItem avatar key={x.symbol}>
              <Left>{/* <Thumbnail source={{ uri: "Image URL" }} /> */}</Left>
              <Body>
              <Text>{x.symbol}</Text>
                <Text note>
                Order Price:{x.orderPrice}
                </Text>
                <Text note>
                Invested Amount: {x.investedAmount.toFixed(2)}
                </Text>
               
              </Body>
              <Right>
               
              <Text note>{moment(x.createdOn).format("DD/MM/YYYY hh:mm a")}</Text>
              <Text note>
                Quantity:{x.qty}
                </Text>
                <Button onPress={()=>{
               
                    navigation.navigate('SlotDetails',{stock:x})
                  
                }}><Text>Remove</Text></Button>
              
              </Right>
            </ListItem>)}
            
            
          </List>
       
        </Content>
        </>}
     
      </View>
    </Container>
  );
};
