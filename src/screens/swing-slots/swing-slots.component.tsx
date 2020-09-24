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
  CardItem,
} from "native-base";
import { getSlots } from "../../services/stock.service";
import moment from "moment";
export default () => {
  const [active, setActive] = useState(false);
  const [slots, setSlots] :any= useState([]);

    useEffect(()=>{
        getSlots().then(x=>{
           
            setSlots(x);
        })
    },[])

  return (
    <Container>
      <View style={{ flex: 1 }}>
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
              </Right>
            </ListItem>)}
            
            
          </List>
        </Content>
        <Fab
          active={active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={() => {
            setActive((prev) => !prev);
          }}
        >
          <Icon name="add" />
        </Fab>
      </View>
    </Container>
  );
};
