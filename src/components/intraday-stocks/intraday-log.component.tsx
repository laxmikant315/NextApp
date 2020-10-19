import React, { useContext, useEffect, useState } from "react";
import Stocks from "./stocks.component";
import { AppContext } from "../../providers/app.provider";
import { getNotifications } from "../../services/stock.service";
import { RefreshControl } from "react-native";
import { Spinner } from "native-base";

const IntradayLogs = () => {


  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);



  const fetchData = () => {
    setLoading(true);
    getNotifications("priceaction").then((resp) => {
      console.log(resp.data)
      if (resp) {
        setStocks(resp.data);
      }
    }).finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return <>
    {loading ?
      <Spinner color='blue' /> :
      <Stocks stocks={stocks} fetchData={fetchData} />
    }</>;
};

export default IntradayLogs;
