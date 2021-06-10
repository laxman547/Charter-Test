import React, { useState, useEffect } from "react";
import customers from "./dataset.json";
import './App.css';

const dataSet = customers;

function App() {
  const calculateRewards = (monthRecord) => {
    const monthExpenseList = Object.values(monthRecord);
    return monthExpenseList.map((record) => {
      if (record > 100) return 50 + ((record - 100) * 2);
      else if (record > 50) return (record - 50) * 1;
      return 0;
    })
  }

  const getAggregate = (list) => {
    const res = list.reduce((accumulator, currentValue) => {
      return accumulator += currentValue;
    }, 0);
    return res;
  }

  const getRewardedCustomerList = () => {
    const resultSet = [];
    if (Array.isArray(dataSet.customers)) {
      dataSet.customers.forEach((record) => {
        resultSet.push({
          name: record.name,
          m1: calculateRewards(record.m1),
          m1Aggregate: getAggregate(calculateRewards(record.m1)) || 0,
          m2: calculateRewards(record.m2),
          m2Aggregate: getAggregate(calculateRewards(record.m2)) || 0,
          m3: calculateRewards(record.m3),
          m3Aggregate: getAggregate(calculateRewards(record.m3)) || 0,
        });
      })
    }
    return resultSet;
  }

  const [recordList, setRecordList] = useState([])
  useEffect(() => {
    const list = getRewardedCustomerList();
    setRecordList(list);
  }, [])

  return (
    <div className="App">
      <header>
        <strong> Customer Reward Summary </strong>
      </header>
      <table className="table table-striped">
        <thead>
          <tr>
            <th> Customer Name</th>
            <th> Month1</th>
            <th>Month2</th>
            <th> Month3</th>
            <th> Aggregate</th>
          </tr>
        </thead>
        <tbody>
          {
            recordList.map((record, key) => {
              return (
                <tr key={key}>
                  <td> {record.name}</td>
                  <td> {record.m1Aggregate}</td>
                  <td> {record.m2Aggregate}</td>
                  <td> {record.m3Aggregate}</td>
                  <td> {Number(record.m1Aggregate) + Number(record.m2Aggregate) + Number(record.m3Aggregate)} </td>
                </tr>

              )

            })

          }
        </tbody>
      </table>
    </div>
  );
}

export default App;