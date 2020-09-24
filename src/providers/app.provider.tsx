import React, { createContext, useState } from "react";

export const AppContext = createContext<{
  intradayStocks: any;
  setIntradayStocks: (intradayStocks: any) => void;
  swingStocks: any;
  setSwingStocks: (intradayStocks: any) => void;

  selectedStock: any;
  setSelectedStock: (selectedStock: any) => void;
  config: any;
  setConfig: (config: any) => void;

  savedTrade: any;
  setSavedTrade: (savedTrade: any) => void;
}>({
  intradayStocks: [],
  setIntradayStocks: (intradayStocks: any) => {},
  swingStocks: [],
  setSwingStocks: (intradayStocks: any) => {},
  selectedStock: null,
  setSelectedStock: (selectedStock: any) => {},
  config: null,
  setConfig: (config: any) => {},

  savedTrade: [],
  setSavedTrade: (savedTrade: any) => {},
});

const AppProvider = ({ children }: any) => {
  const [intradayStocks, setIntradayStocks]: any = useState([]);
  const [config, setConfig]: any = useState();
  const [swingStocks, setSwingStocks]: any = useState([]);
  const [selectedStock, setSelectedStock] = useState<any>();
  const [savedTrade, setSavedTrade] = useState<any>([]);

  return (
    <AppContext.Provider
      value={{
        intradayStocks,
        setIntradayStocks,
        selectedStock,
        setSelectedStock,
        swingStocks,
        setSwingStocks,
        config,
        setConfig,
        savedTrade,
        setSavedTrade,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
