import React, { Fragment } from 'react';

import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';
import VirtualizedSelect from 'react-virtualized-select';

const Filter = ({ name, options, value, onChange, handleClear }) => {
  return (
    <Fragment>
      <h4>{name}</h4>
      <VirtualizedSelect
        value={value}
        onChange={onChange}
        options={options}
        multi
        searchable
      />
      <button onClick={handleClear}>Clear</button>
    </Fragment>
  );
}

export default Filter;