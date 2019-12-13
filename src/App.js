import React, { useReducer, createContext } from 'react';
import './App.css';

import Chart from './containers/ChartContainer';

import FilterReducer, { getOptions } from './reducers/FilterReducer';
import Filters from './containers/FiltersContainer';

const datasourceFilterState = {
  selected: [],
  options: [{value: 'All', label: 'All'}, ...getOptions('Datasource') ]
};

const campaignFilterState = {
  selected: [],
  options: [{value: 'All', label: 'All'}, ...getOptions('Campaign') ]
};

export const DatasourceFilterContext = createContext();
export const CampaignFilterContext = createContext();

function App() {
  const [datasourceState, datasourceDispatch] = useReducer(FilterReducer, datasourceFilterState);
  const [campaignState, campaignDispatch] = useReducer(FilterReducer, campaignFilterState);

  return (
    <DatasourceFilterContext.Provider value={{ datasourceState, datasourceDispatch }}>
      <CampaignFilterContext.Provider value={{ campaignState, campaignDispatch }}>
        <div className="app">
          <Filters/>
          <Chart campaigns={campaignState.selected} datasources={datasourceState.selected}/>
        </div>
      </CampaignFilterContext.Provider>
    </DatasourceFilterContext.Provider>
  );
}

export default App;
