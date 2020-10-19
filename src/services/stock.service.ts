import axios from 'axios';
import Constants from 'expo-constants';

const {apiUrl}= Constants.manifest.extra;

export const getNotifications=(type:string,offSet?:string,limit:number=10)=> {
  return axios.get(`${apiUrl}/notifications?type=${type}${offSet ? `&limit=${limit}&offSet=${offSet}` : ""}`).then(x=>x.data);
}
export const getConfig=()=> {
  return axios.get(`${apiUrl}/appConfig`).then(x=>x.data);
}



export const getSlots=()=> {
  const url = `${apiUrl}/swing/v2/slots`;
  console.log(url)
  return axios.get(url).then(x=>x.data);
}


export const registerPush=(expoPushToken:string)=> {
  console.log(`${apiUrl}/registerPush`)

   return axios.post(`${apiUrl}/registerPush`,{expoPushToken});
}

export const placeOrder=(order:{ symbol:string, transaction_type:string, quantity:number, price:number, sl:number, target:number})=> {
 
   return axios.post(`${apiUrl}/kite/order`,{...order});
}

export const pushOnApp=()=> {
  return axios.get(`${apiUrl}/pushOnApp`).then(x=>x.data);
}

export const getSwingExecute=(order:{ symbol:string, orderPrice:number})=> {
 
  return axios.post(`${apiUrl}/swing/v2/execute`,{...order});
}
export const getSwingExecuteOut=(order:{ symbol:string, orderPrice:number})=> {
 
  return axios.post(`${apiUrl}/swing/v2/executeOut`,{...order});
}

export const getTransactions=()=> {
 
  return axios.get(`${apiUrl}/swing/v2/transactions`).then(x=>x.data);
}



