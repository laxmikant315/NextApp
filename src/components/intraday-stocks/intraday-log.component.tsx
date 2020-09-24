import React, { useContext, useEffect, useState } from "react";
import Stocks from "./stocks.component";
import { AppContext } from "../../providers/app.provider";
import { getNotifications } from "../../services/stock.service";
import { RefreshControl } from "react-native";

const IntradayLogs = () => {
  

  const [stocks, setStocks] = useState([]);



const fetchData = ()=>{
  getNotifications("priceaction").then((resp) => {
    console.log(resp.data)
    if (resp) {
      setStocks(resp.data);
    }
  });
}

  useEffect(() => {
    fetchData();
  }, []);

  return <Stocks  stocks={stocks}   fetchData={fetchData}/>;
};

export default IntradayLogs;
