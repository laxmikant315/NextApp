import React, { useContext, useEffect } from "react";
import Stocks from "./stocks.component";
import { AppContext } from "../../providers/app.provider";
import { getNotifications } from "../../services/stock.service";

const SwingStocks = () => {
  const {
    intradayStocks,
    swingStocks,
    setIntradayStocks,
    selectedStock,
    setSelectedStock,
    setSwingStocks,
  } = useContext(AppContext);


   
  const fetchData = ()=>{
    getNotifications("swing").then((resp) => {
      console.log(resp.data)
      if (resp) {
        setSwingStocks(resp.data);
      }
    });
  }
  
    useEffect(() => {
      fetchData();
    }, []);


  return <Stocks type="swing"  stocks={swingStocks} fetchData={fetchData} />;
};

export default SwingStocks;
