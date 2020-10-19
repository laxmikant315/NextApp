import React, { useContext, useEffect, useState } from "react";
import Stocks from "./stocks.component";
import { AppContext } from "../../providers/app.provider";
import { getNotifications } from "../../services/stock.service";
import { Spinner, View,Text } from "native-base";

const IntradayStocks = () => {
  const {
    intradayStocks,
 
    setIntradayStocks,
  
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
 
 
  const fetchData = ()=>{
    setLoading(true);
    getNotifications("intraday").then((resp) => {
      console.log('Data',resp.data)
      if (resp) {
        setIntradayStocks(resp.data);
      }
    }).finally(()=> setLoading(false));
  }
  
    useEffect(() => {
      fetchData();
    }, []);

  return <View style={{width:'100%'}}> 
   
          
    {loading ?
    <Spinner  color='blue'  />  : 
     <Stocks  stocks={intradayStocks} fetchData={fetchData} />
       }
     </View>
};

export default IntradayStocks;
