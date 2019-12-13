import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import moment from 'moment';

import data from '../data.json';
import ChartDataService from '../services/ChartDataService';

const Chart = ({campaigns, datasources}) => {
  const {
    GetChartStartPoint,
    GetDatePlusWeek,
    GetDateMinusWeek,
    GetFilteredByDate,
    GetFilteredByProperty,
    GetSanitizedData,
    GetChartEndPoint
  } = ChartDataService;

  const [positionStart, setPositionStart] = useState(GetChartStartPoint(data));
  const [positionEnd, setPositionEnd] = useState(GetDatePlusWeek(positionStart));
  const [chartData, setChartData] = useState([]);

  function GetChartData() {
    const dateFiltered = GetFilteredByDate(data, positionStart, positionEnd);
    const filteredByDatasource = GetFilteredByProperty(dateFiltered, 'Datasource', datasources);
    const filteredByCampaign = GetFilteredByProperty(filteredByDatasource, 'Campaign', campaigns);
    const sanitizedData = GetSanitizedData(filteredByCampaign);

    setChartData(sanitizedData);
  }

  function goToStartWeek() {
    setPositionStart(GetChartStartPoint(data));
    setPositionEnd(GetDatePlusWeek(positionStart))
  }

  function goToLastWeek() {
    const endPoint = GetChartEndPoint(data);

    setPositionStart(GetDateMinusWeek(endPoint));
    setPositionEnd(endPoint);
  }

  function goToPreviousWeek() {
    const startPoint = GetChartStartPoint(data);

    if(moment(positionStart, 'DD.MM.YYYY').isAfter(moment(startPoint, 'DD.MM.YYYY'))) {
      const newEnd = positionStart;
      setPositionStart(GetDateMinusWeek(positionStart));
      setPositionEnd(newEnd);
    }
  }

  function goToNextWeek() {
    const endPoint = GetChartEndPoint(data);

    if(moment(positionEnd, 'DD.MM.YYYY').isBefore(moment(endPoint, 'DD.MM.YYYY'))) {
      const newStart = GetDatePlusWeek(positionStart);
      setPositionStart(newStart);
      setPositionEnd(GetDatePlusWeek(newStart));
    }
  }

  useEffect(() => {
    GetChartData();
  }, [datasources, campaigns, positionEnd]);

  return (
    <div className="chart">
      <div className="chart-holder">
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#f01e6d" activeDot={{r: 8}} />
            <Line yAxisId="right" type="monotone" dataKey="impressions" stroke="#0084ff" activeDot={{r: 8}} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button onClick={() => goToStartWeek()}>First Week</button>
      <button onClick={() => goToPreviousWeek()}>Previous Week</button>
      <button onClick={() => goToNextWeek()}>Next Week</button>
      <button onClick={() => goToLastWeek()}>Last Week</button>
    </div>
  )
}

export default Chart;
