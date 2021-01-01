import React from "react";

import { formatPrice, formatDuration, formatInterval } from "../../utils";
import TicketInterface from "../../interfaces/Ticket";
import "./Ticket.scss";

interface Props {
  ticketInfo: TicketInterface;
}

const Ticket: React.FC<Props> = ({ ticketInfo }: Props) => {
  return (
    <div className="tickets-list__item ticket">
      <div className="ticket__header">
        <div className="ticket__price">{formatPrice(ticketInfo.price)} Р</div>
        <div className="ticket__carrier">
          <img
            src={`//pics.avs.io/99/36/${ticketInfo.carrier}.png`}
            alt={`${ticketInfo.carrier} logo`}
          />
        </div>
      </div>
      <div className="ticket__segments">
        {ticketInfo.segments.map((item) => {
          return (
            <>
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
                    {item.stops && item.stops.length} пересадки
                  </div>
                  <div className="value">
                    {item.stops && item.stops.join(", ")}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Ticket;
