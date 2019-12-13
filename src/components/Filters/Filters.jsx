import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
  setCheckedFilter, setUncheckedFilter,
  setCheckedAllFilters,
  setUncheckedAllFilters
} from '../../redux/reducer';

import styles from './Filters.module.css';
import FiltersItem from '../FiltersItem';

const Filters = ({ filters, setCheckedFilter,
  setUncheckedFilter,
  setCheckedAllFilters,
  setUncheckedAllFilters }) => {
  return (
    <div className={styles.filters}>
      <div className={styles.heading}>Количество пересадок</div>
      <ul className={styles.list}>
        {
          filters.map(({ label, id, isChecked, isAll = false }) => {
            const handleSetCheckedFilter = isAll ? setCheckedAllFilters : setCheckedFilter;
            const handleSetUncheckedFilter = isAll ? setUncheckedAllFilters : setUncheckedFilter;
            return (
              <li key={id}>
                <FiltersItem
                  text={label}
                  isChecked={isChecked}
                  id={id}
                  handleSetCheckedFilter={handleSetCheckedFilter}
                  handleSetUncheckedFilter={handleSetUncheckedFilter} />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

class FiltersContainer extends Component {

  componentDidUpdate(prevProps) {
    const { filters, setCheckedAllFilters } = this.props;

    if (filters !== prevProps.filters) {
      filters.filter(({ isAll }) => isAll !== true)
             .every(({ isChecked } ) => isChecked) &&
             filters.some(({ isChecked }) => !isChecked) &&
             setCheckedAllFilters();
    }
  }

  render() {
    return <Filters { ...this.props } />
  }
}

const mapStateToProps = ({ filters }) => ({ filters });

export default connect(mapStateToProps,
  {
    setCheckedFilter, setUncheckedFilter,
    setCheckedAllFilters, setUncheckedAllFilters
  })(FiltersContainer);
