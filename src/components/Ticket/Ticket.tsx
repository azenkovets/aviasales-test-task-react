import React from "react";

import Segment from "../Segment";
import { formatPrice } from "../../utils";
import { CARRIERS_LOGO_URL } from "../../constants";
import ITicket from "../../interfaces/ITicket";

import styles from "./Ticket.module.scss";

const Ticket: React.FC<ITicket> = ({ price, carrier, segments }: ITicket) => {
  return (
    <div className={styles.ticket}>
      <div className={styles.ticket__header}>
        <div className={styles.ticket__price}>{formatPrice(price)} Р</div>
        <div className={styles.ticket__carrier}>
          <img
            src={`${CARRIERS_LOGO_URL}/${carrier}.png`}
            alt={`${carrier} logo`}
          />
        </div>
      </div>
      <div className={styles.ticket__segments}>
        {segments.map((item, index) => {
          // The server doesn't provide any unique ID which we can use as a key.
          const key = `segment--${index}-${item.origin}-${item.destination}`;
          return (
            <Segment
              origin={item.origin}
              destination={item.destination}
              date={item.date}
              duration={item.duration}
              stops={item.stops}
              key={key}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Ticket;
