import React from "react";

import {
  formatPrice,
  formatDuration,
  formatInterval,
  formatStopsText,
} from "../../utils";
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
        {segments.map((item) => {
          return (
            <div className="ticket__segment segment">
              <div className="segment__column">
                <div className="label">
                  {item.origin} - {item.destination}
                </div>
                <div className="value">
                  {formatInterval(item.date, item.duration)}
                </div>
              </div>
              <div className="segment__column">
                <div className="label">В пути</div>
                <div className="value">{formatDuration(item.duration)}</div>
              </div>
              <div className="segment__column">
                <div className="label">
                  {formatStopsText(item.stops.length)}
                </div>
                <div className="value">
                  {item.stops && item.stops.join(", ")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ticket;
