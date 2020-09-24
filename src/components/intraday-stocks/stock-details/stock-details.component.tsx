import React, { useState, useEffect } from "react";
import { View, Text, Grid, Col } from "native-base";

import { LineChart, BarChart, ChartConfig } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const StockDetails = ({ stock }: any) => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        data: [0, 0, 0, 0],
      },
    ],
  });
  const [dataTrend, setDataTrend] = useState({
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        data: [0, 0, 0, 0],
      },
    ],
  });

  const chart = {
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },

      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [1, 2, 3, 4],
      },
    },
  };

  const colors = ["#5fa3f0", "#f0e15f", "#5fe48a"];
  const [bar, setBarData] = useState({
    labels: ["Avarage", "Allowed", "Today"],
    datasets: [
      {
        data: [0, 0, 0],
      },
    ],
  });

  useEffect(() => {
    const getData = async () => {
      if (stock) {
        setLoading(false);
        const {
          highestHigh,
          lowestLow,
          high,
          low,
          currentPrice,
          trend,
          trendLine
        } = stock;
        let indexes: number[] = [
          highestHigh.indexNo,
          lowestLow.indexNo,
          high.indexNo,
          low.indexNo,
        ];

        const startIndex = Math.min(...indexes);
        const endIndex = Math.max(...indexes);

        indexes = indexes.sort((x, y) => x - y);

        const final: any[] = [];
        for (const i of indexes) {
          if (highestHigh.indexNo === i) {
            final.push(highestHigh.highest);
          } else if (lowestLow.indexNo === i) {
            final.push(lowestLow.lowest);
          } else if (low.indexNo === i) {
            final.push(low.lowest);
          } else if (high.indexNo === i) {
            final.push(high.highest);
          }
        }

        final.push(currentPrice);

        let labels = [
          `LL(${lowestLow.lowest})`,
          `H(${high.highest})`,
          `L(${low.lowest})`,
          `HH(${highestHigh.highest})`,
          `C(${currentPrice})`,
        ];

        if (trend === "DOWN") {
          labels = [
            `HH (${highestHigh.highest})`,
            `L (${low.lowest})`,
            `H (${high.highest})`,
            `LL (${lowestLow.lowest})`,
            `Current (${currentPrice})`,
          ];
        }

        setData({
          labels: labels,
          datasets: [
            {
              data: final,
            },
          ],
        });

        setDataTrend({
          labels: labels,
          datasets: [
            {
              data: trendLine,
            },
          ],
        });

        setBarData({
          labels: [
            `Avarage (${stock.avgCandelSize})`,
            `Allowed (${stock.allowedCandelSize})`,
            `Today (${stock.todayCandelSize})`,
          ],
          datasets: [
            {
              data: [
                stock.avgCandelSize,
                stock.allowedCandelSize,
                stock.todayCandelSize,
              ],
            },
          ],
        });
      }
    };
    getData();
  }, [stock]);

  const data1 = {
    labels: ["Avarage", "Allowed", "Today"],
    datasets: [
      {
        data: [123, 45, 28],
      },
    ],
  };

  const chartConfig :ChartConfig= {
    backgroundColor: "red",
    backgroundGradientFrom: "#05052F",
    backgroundGradientTo: "#FFF",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 5,
    },
    propsForDots: {
      r: "2",
      strokeWidth: "2",
      stroke: "#fff",
      
    },
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        padding: 10,
      }}
    >
      {stock.type!=="priceaction" && 
      <BarChart
        style={{
          marginVertical: 8,
          borderRadius: 5,
        }}
        fromZero
        data={bar}
        width={Dimensions.get("window").width - 15}
        height={220}
        chartConfig={chartConfig}
      />
}

      {chart && data && (
        //    <Chart
        //   options={options}
        //   series={series}
        //   type="bar"
        //   width="500"
        // />
        <LineChart
          data={data}
          width={Dimensions.get("window").width - 15} // from react-native
          height={220}
          yAxisLabel="₹"
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 5,
          }}
        />
      )}
     
      {chart && dataTrend && (
        <LineChart
          data={dataTrend}
          width={Dimensions.get("window").width - 15} // from react-native
          height={220}
          yAxisLabel="₹"
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 5,
          }}
        />
      )}
    </View>
  );
};
export default StockDetails;
