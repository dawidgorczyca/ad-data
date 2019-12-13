import React from 'react';

import { DatasourceFilterContext, CampaignFilterContext } from '../App';
import Filter from '../components/FilterComponent';

const Filters = () => (
  <DatasourceFilterContext.Consumer>
    {({datasourceState, datasourceDispatch}) => (
      <CampaignFilterContext.Consumer>
        {({campaignState, campaignDispatch}) => (
          <div className="filters">
            <h3>Filter dimension values</h3>

            <Filter
              name="Datasource"
              options={datasourceState.options}
              value={datasourceState.selected}
              onChange={(option) => datasourceDispatch({type: 'SET', payload: option})}
              handleClear={() => datasourceDispatch({type: 'CLEAR'})}
            />

            <Filter
              name="Campaign"
              options={campaignState.options}
              value={campaignState.selected}
              onChange={(option) => campaignDispatch({type: 'SET', payload: option})}
              handleClear={() => campaignDispatch({type: 'CLEAR'})}
            />
          </div>
        )}
      </CampaignFilterContext.Consumer>
    )}
  </DatasourceFilterContext.Consumer>
)

export default Filters;
