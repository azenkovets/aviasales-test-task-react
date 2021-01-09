import React from "react";

import Segment from "../Segment";
import { formatPrice } from "../../utils";
import { CARRIERS_LOGO_URL } from "../../constants";
import ITicket from "../../interfaces/ITicket";
import "./Ticket.scss";

const Ticket: React.FC<ITicket> = ({ price, carrier, segments }: ITicket) => {
  return (
    <div className="tickets-list__item ticket">
      <div className="ticket__header">
        <div className="ticket__price">{formatPrice(price)} Р</div>
        <div className="ticket__carrier">
          <img
            src={`${CARRIERS_LOGO_URL}/${carrier}.png`}
            alt={`${carrier} logo`}
          />
        </div>
      </div>
      <div className="ticket__segments">
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
