import React from 'react';

import styles from './FiltersItem.module.css';

const FiltersItem = ({ id, text, isChecked,
  handleSetCheckedFilter, handleSetUncheckedFilter }) => {

  const handleChangeInput = () => {
    isChecked ? handleSetUncheckedFilter(id) : handleSetCheckedFilter(id);
  }

  return (
    <label className={styles.filtersItem}>
      <input className={styles.checkboxInput}
        type="checkbox"
        checked={isChecked}
        onChange={handleChangeInput} />
      <span className={styles.checkbox}></span>
      {text}
    </label>
  );
}

export default FiltersItem;
