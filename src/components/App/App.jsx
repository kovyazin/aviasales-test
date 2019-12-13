import React from 'react';

import Logo from '../Logo';
import Filters from '../Filters';
import ToggleButtons from '../ToggleButtons';
import TicketCard from '../TicketCard';

import styles from './App.module.css';

const App = ({ tickets, methodSort, filters }) => {
  const sortTickets = (method) => {
    return method === 'speed'
      ? tickets.sort((a, b) => (a.segments[0].duration + a.segments[1].duration) - (b.segments[0].duration + b.segments[1].duration))
      : tickets.sort((a, b) => a.price - b.price);
  }

  return (
    <div className={styles.app}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <div className={styles.main}>
        <div className={styles.sidebar}>
          <Filters />
        </div>
        <div className={styles.tickets}>
          <ToggleButtons />
          <div className={styles.ticketsList}>
            {
              sortTickets(methodSort)
                .filter(({ segments }) => (
                  filters.some(({ isChecked, stops }) => (isChecked && (stops === segments[0].stops.length || stops === segments[1].stops.length)))
                ))
                .filter((ticket, idx) => idx < 5)
                .map((ticket) => {
                  return (
                    <div className={styles.ticketsItem}>
                      <TicketCard { ...ticket } />
                    </div>
                  );
                })
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
