import React, { useContext, useEffect } from "react";
import Stocks from "./stocks.component";
import { AppContext } from "../../providers/app.provider";
import { getNotifications } from "../../services/stock.service";

const IntradayStocks = () => {
  const {
    intradayStocks,
    swingStocks,
    setIntradayStocks,
    selectedStock,
    setSelectedStock,
    setSwingStocks,
  } = useContext(AppContext);

 
  const fetchData = ()=>{
    getNotifications("intraday").then((resp) => {
      console.log(resp.data)
      if (resp) {
        setIntradayStocks(resp.data);
      }
    });
  }
  
    useEffect(() => {
      fetchData();
    }, []);

  return <Stocks  stocks={intradayStocks} fetchData={fetchData} />;
};

export default IntradayStocks;
