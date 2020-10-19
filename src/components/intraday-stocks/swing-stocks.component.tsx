import React, { useContext, useEffect, useState } from "react";
import Stocks from "./stocks.component";
import { AppContext } from "../../providers/app.provider";
import { getNotifications } from "../../services/stock.service";
import { Spinner } from "native-base";

const SwingStocks = () => {
  const {
    intradayStocks,
    swingStocks,
    setIntradayStocks,
    selectedStock,
    setSelectedStock,
    setSwingStocks,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
   
  const fetchData = ()=>{
    setLoading(true);
    getNotifications("swing").then((resp) => {
      console.log(resp.data)
      if (resp) {
        setSwingStocks(resp.data);
      }
    }).finally(()=> setLoading(false));
  }
  
    useEffect(() => {
      fetchData();
    }, []);


  return  <>
    {loading ?
      <Spinner  color='blue'  />  : 
  <Stocks type="swing"  stocks={swingStocks} fetchData={fetchData} />
    }
  </>;
};

export default SwingStocks;
