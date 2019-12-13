import React from 'react';
import moment from 'moment';

import styles from './TicketCard.module.css';

const TicketCard = ({ price, segments, carrier }) => {
  return (
    <div className={styles.ticketCard}>

      <div className={styles.header}>
        <div className={styles.price}>{price.toLocaleString()} Р </div>
        <div className={styles.logo}></div>
        <img className={styles.logo} src={`//pics.avs.io/99/36/${carrier}.png`} alt="Logo"
          width="110" height="36" />
      </div>

      <div className={styles.flightsList}>
        {
          segments.map(({ origin, destination, date, duration, stops }) => {
            return (
              <div className={styles.flightsItem}>
                <div className={styles.flightsCol}>
                  <span className={styles.flightsTitle}>
                    {`${origin} – ${destination}`}
                  </span>
                  <span className={styles.flightsInfo}>
                    {
                      `${moment(date).format('HH:mm')} –
                     ${moment(date).add(duration, 'minutes').format('HH:mm')}`
                    }
                  </span>
                </div>
                <div className={styles.flightsCol}>
                  <span className={styles.flightsTitle}>В пути</span>
                  <span className={styles.flightsInfo}>
                    {`${Math.trunc(duration / 60)}ч ${duration % 60}м`}
                  </span>
                </div>

                <div className={styles.flightsCol}>
                  <span className={styles.flightsTitle}>
                    {
                      !stops.length ? 'Без пересадок' : stops.length === 1
                        ? `${stops.length} пересадка` : `${stops.length} пересадки`
                    }
                  </span>
                  <span className={styles.flightsInfo}>
                    {stops.length ? stops.join(', ') : '----'}
                  </span>
                </div>
              </div>
            );
          })
        }
      </div>

    </div>
  );
};

export default TicketCard;
