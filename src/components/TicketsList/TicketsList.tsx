import React from "react";
import { useStoreon } from "storeon/react";

import Ticket from "../Ticket";
import NoResults from "../NoResults";
import { TICKETS_COUNT_LIMIT } from "../../constants";
import IState from "../../interfaces/IState";

const TicketsList: React.FC = () => {
  const { tickets } = useStoreon<IState>("tickets");

  return (
    <div className="tickets-list">
      {!tickets.length ? (
        <NoResults />
      ) : (
        tickets.slice(0, TICKETS_COUNT_LIMIT).map((item, index) => {
          // The server doesn't provide any unique ID which we can use as a key.
          const key = `ticket--${index}-${item.carrier}-${item.price}`;
          return (
            <Ticket
              price={item.price}
              carrier={item.carrier}
              segments={item.segments}
              key={key}
            />
          );
        })
      )}
    </div>
  );
};

export default TicketsList;
