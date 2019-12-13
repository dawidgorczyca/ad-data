import _ from 'lodash';

import data from '../data.json';

export function getOptions(propertyName) {
  return _.map(_.uniqBy(data, propertyName), propertyName).map((option) => {
    return {
      value: option,
      label: option
    };
  })
}

const FilterReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      if(action.payload.length === 0) {
        return {
          ...state,
          selected: []
        }
      }

      if(_.findIndex(action.payload, {value: 'All'}) !== -1) {
        const output = JSON.parse(JSON.stringify(state.options));
        output.shift();
        return {
          ...state,
          selected: output
        }
      }

      return {
        ...state,
        selected: action.payload
      };
    case 'CLEAR':
      return {
        ...state,
        selected: []
      };
    default:
      return state;
  }
}

export default FilterReducer;
