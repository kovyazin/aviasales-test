import React from 'react';
import { connect } from 'react-redux';
import { changeMethodSort } from '../../redux/reducer';

import styles from './ToggleButtons.module.css';

const ToggleButtons = ({ methodSort, changeMethodSort }) => {
  return (
    <div className={styles.toggleButtons}>
      <button
        className={`${styles.btn} ${methodSort === 'price' ? styles.active : ''}`}
        type="button"
        onClick={() => changeMethodSort('price')}>
        Самый дешёвый
      </button>
      <button
        className={`${styles.btn} ${methodSort === 'speed' ? styles.active : ''}`}
        type="button"
        onClick={() => changeMethodSort('speed')}>
        Самый быстрый
      </button>
    </div>
  );
};

const mapStateToProps = ({ methodSort }) => {
  return {
    methodSort
  }
}

export default connect(mapStateToProps, { changeMethodSort })(ToggleButtons);

// export default ToggleButtons;
