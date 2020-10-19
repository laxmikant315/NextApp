
import React, { useEffect, useState } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Toast, Spinner } from 'native-base';
import { getSwingExecute, getSwingExecuteOut } from '../../services/stock.service';

const NewSlot = ({navigation,route}:any)=>{
  const [state,setState] = useState({symbol:"",orderPrice:""});

  const  stock = route.params && route.params.stock || null;
  useEffect(()=>{
    if(stock){

      setState({...stock})
    } 
  },[stock])
  const [loading, setLoading] = useState(false);
    return <Container>
 
    <Content>
      <Form >

        <Item stackedLabel>
<Label>Symbol{state.orderPrice}</Label>
          <Input value={state.symbol} onChangeText={(symbol)=>setState({...state,symbol})} />
        </Item>
        <Item stackedLabel last>
          <Label>Order Price</Label>
          <Input  value={state.orderPrice.toString()}  keyboardType="decimal-pad" onChangeText={(orderPrice)=>
            
            setState({...state,orderPrice})}  />
        </Item>
       
      </Form>
      <Button style={{alignSelf:"center",marginTop:20}} onPress={async ()=>{
        setLoading(true);
        if(stock){
          const res = await getSwingExecuteOut({symbol:state.symbol,orderPrice:+state.orderPrice}).finally(()=> setLoading(false));
       
          const resCode =res.data.resCode ; 

          if(resCode==="EXECUTED"){
            navigation.navigate('Slots');

            Toast.show({
              text: 'Successfully removed.',
              buttonText: 'Okay',
              type: "success"
            })
          }

          return;
        }

         const res = await getSwingExecute({symbol:state.symbol,orderPrice:+state.orderPrice}).finally(()=> setLoading(false));;
         const resCode =res.data.resCode ; 
         if(resCode=== "SLOTS_ARE_FULL" ){
          Toast.show({
            text: 'Slots are full.',
            buttonText: 'Okay',
            type: "warning"
          })
         }else if(resCode=== "STOCK_ALREADY_EXISTS" ){
          Toast.show({
            text: 'Stocky already exists.',
            buttonText: 'Okay',
            type: "warning"
          })

        }
        else if(resCode=== "AMOUNT_IS_NOT_AVAILABLE" ){
          Toast.show({
            text: 'Ammount is not availble',
            buttonText: 'Okay',
            type: "warning"
          })

        }else{
          navigation.navigate('Slots');
          Toast.show({
            text: 'Successfully added.',
            buttonText: 'Okay',
            type: "success"
          })
        }
      }}>
         {loading &&  
      <Spinner  color='white' style={{marginLeft:10}}  />} 
            <Text>Submit</Text>
          </Button>
    
    </Content>
  </Container>
}

export default NewSlot