import React from "react";
import { useStoreon } from "storeon/react";

import Ticket from "../Ticket";
import State from "../../interfaces/State";

const TicketsList: React.FC = () => {
  const { tickets } = useStoreon<State>("tickets");

  return (
    <div className="tickets-list">
      {tickets.map((item, index) => {
        return index < 5 && <Ticket ticketInfo={item} />;
      })}
    </div>
  );
};

export default TicketsList;
