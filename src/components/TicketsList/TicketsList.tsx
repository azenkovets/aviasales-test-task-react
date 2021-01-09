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
        tickets.slice(0, TICKETS_COUNT_LIMIT).map((item) => {
          return <Ticket ticketInfo={item} />;
        })
      )}
    </div>
  );
};

export default TicketsList;
